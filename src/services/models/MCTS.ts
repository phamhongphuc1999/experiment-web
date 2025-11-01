import * as ort from 'onnxruntime-web';
import { ALPHA, C_PUCT, EXPLORE } from 'src/configs/model.config';
import { TurnType } from 'src/global';
import { BaseGame } from './BaseGame';
import Connect4Model from './connect4-model';
import { sampleGamma } from './utils';

export type StateInt = number;
export type VisitCount = Record<StateInt, number[]>;
export type Value = Record<StateInt, number[]>;
export type ValueAverage = Record<StateInt, number[]>;
export type Probs = Record<StateInt, number[]>;

export class MCTS {
  private c_puct: number;
  private visitCount: VisitCount;
  private value: Value;
  private valueAvg: ValueAverage;
  private probs: Probs;
  private game: BaseGame;

  constructor(game: BaseGame) {
    this.c_puct = C_PUCT;
    this.visitCount = {};
    this.value = {};
    this.valueAvg = {};
    this.probs = {};
    this.game = game;
  }

  clear(): void {
    this.visitCount = {};
    this.value = {};
    this.valueAvg = {};
    this.probs = {};
  }

  length(): number {
    return Object.keys(this.value).length;
  }

  private addNoise(probs: number[]): number[] {
    const alpha = ALPHA;
    const explore = EXPLORE;
    const actionSpace = this.game.actionSpace;

    const gammaSamples: number[] = [];
    for (let i = 0; i < actionSpace; i++) {
      gammaSamples.push(sampleGamma(alpha, 1));
    }

    const sum = gammaSamples.reduce((a, b) => a + b, 0);
    const dirichlet = gammaSamples.map((v) => v / sum);

    return probs.map((p, i) => (1 - explore) * p + explore * dirichlet[i]);
  }

  private calculateUpperBound(valuesAvg: number[], probs: number[], counts: number[]): number[] {
    const totalSqrt = Math.sqrt(counts.reduce((a, b) => a + b, 0));
    return valuesAvg.map((v, i) => v + (this.c_puct * probs[i] * totalSqrt) / (1 + counts[i]));
  }

  private maskInvalidActions(scores: number[], curState: number): void {
    const invalid = this.game.invalidMoves(curState);
    for (const i of invalid) scores[i] = -Infinity;
  }

  private isLeaf(stateInt: number): boolean {
    return !(stateInt in this.probs);
  }

  findLeaf(
    stateInt: number,
    player: TurnType
  ): [number | null, number, TurnType, number[], number[]] {
    const states: number[] = [];
    const actions: number[] = [];
    let curState = stateInt;
    let curPlayer = player;
    let value: number | null = null;

    while (!this.isLeaf(curState)) {
      states.push(curState);
      const counts = this.visitCount[curState];
      let probs = this.probs[curState];
      const valuesAvg = this.valueAvg[curState];

      if (curState === stateInt) probs = this.addNoise(probs);
      const scores = this.calculateUpperBound(valuesAvg, probs, counts);
      this.maskInvalidActions(scores, curState);

      const action = scores.indexOf(Math.max(...scores));
      actions.push(action);

      const [newState, won] = this.game.move(curState, action, curPlayer);
      curState = newState;
      if (won) value = -1.0;

      curPlayer = 1 - curPlayer;

      if (value === null && this.game.possibleMoves(curState).length === 0) value = 0.0;
    }

    return [value, curState, curPlayer, states, actions];
  }

  private createNode(leafState: number, prob: number[]) {
    const n = this.game.actionSpace;
    this.visitCount[leafState] = Array(n).fill(0);
    this.value[leafState] = Array(n).fill(0);
    this.valueAvg[leafState] = Array(n).fill(0);
    this.probs[leafState] = prob;
  }

  private backup(value: number, states: number[], actions: number[]): void {
    let curValue = -value;
    for (let i = states.length - 1; i >= 0; i--) {
      const s = states[i];
      const a = actions[i];
      this.visitCount[s][a] += 1;
      this.value[s][a] += curValue;
      this.valueAvg[s][a] = this.value[s][a] / this.visitCount[s][a];
      curValue = -curValue;
    }
  }

  async searchMinibatch(
    batchSize: number,
    stateInt: number,
    player: TurnType,
    net: Connect4Model
  ): Promise<void> {
    const backupQueue: Array<[number, number[], number[]]> = [];
    const expandStates: number[] = [];
    const expandPlayers: TurnType[] = [];
    const expandQueue: Array<[number, number[], number[]]> = [];
    const planned = new Set<number>();

    for (let i = 0; i < batchSize; i++) {
      const [value, leaf, leafPlayer, states, actions] = this.findLeaf(stateInt, player);
      if (value !== null) backupQueue.push([value, states, actions]);
      else if (!planned.has(leaf)) {
        planned.add(leaf);
        expandStates.push(leaf);
        expandPlayers.push(leafPlayer);
        expandQueue.push([leaf, states, actions]);
      }
    }

    if (expandQueue.length > 0) {
      const batchInput = this.game.statesToTrainingBatch(expandStates, expandPlayers);
      const flat = Float32Array.from(batchInput.flat(3));
      const shape = [batchInput.length, 6, 7, 2];
      const tensor = new ort.Tensor('float32', flat, shape);
      const [probsArr, valuesArr] = await net.predict(tensor);

      for (let i = 0; i < expandQueue.length; i++) {
        const [leaf, states, actions] = expandQueue[i];
        const prob = probsArr.slice(i * this.game.actionSpace, (i + 1) * this.game.actionSpace);
        const val = valuesArr[i];
        this.createNode(leaf, prob);
        backupQueue.push([val, states, actions]);
      }
    }

    for (const [v, s, a] of backupQueue) this.backup(v, s, a);
  }

  async searchBatch(
    count: number,
    batchSize: number,
    stateInt: number,
    player: TurnType,
    net: Connect4Model
  ): Promise<void> {
    for (let i = 0; i < count; i++) await this.searchMinibatch(batchSize, stateInt, player, net);
  }

  getPolicyValue(stateInt: number, tau = 1): [number[], number[]] {
    const counts = this.visitCount[stateInt];
    let probs: number[];
    if (tau === 0) {
      probs = Array(this.game.actionSpace).fill(0);
      probs[counts.indexOf(Math.max(...counts))] = 1;
    } else {
      const adjusted = counts.map((c) => Math.pow(c, 1 / tau));
      const total = adjusted.reduce((a, b) => a + b, 0);
      probs = adjusted.map((c) => c / total);
    }
    const values = this.valueAvg[stateInt];
    return [probs, values];
  }
}
