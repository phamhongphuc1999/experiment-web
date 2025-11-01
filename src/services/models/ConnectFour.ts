import { Matrix, TurnType } from 'src/global';
import { BaseGame } from './BaseGame';

/**
 * Connect Four (6x7 board) implementation.
 *
 * Two players:
 *  - Player 1 (Black) = 1
 *  - Player 0 (White) = 0
 *
 * Uses integer encoding for efficient MCTS.
 */
export class ConnectFour extends BaseGame {
  private readonly gameRows = 6;
  private readonly gameCols = 7;
  private readonly bitsInLen = 3;
  private readonly countToWin = 4;

  constructor() {
    super();
  }

  /** The initial empty board encoded as integer */
  get initialState(): number {
    return this.encodeLists(Array(this.gameCols).fill([]));
  }

  /** Observation shape for neural network [2, 6, 7] */
  get obsShape(): number[] {
    return [2, this.gameRows, this.gameCols];
  }

  /** Number of possible actions (columns) */
  get actionSpace(): number {
    return this.gameCols;
  }

  /** Convert array of bits into integer */
  static bitsToInt(bits: number[]): number {
    let res = 0;
    for (const b of bits) {
      res = res * 2 + b;
    }
    return res;
  }

  /** Convert integer into array of bits (big-endian) */
  static intToBits(num: number, bits: number): number[] {
    const res: number[] = [];
    for (let i = 0; i < bits; i++) {
      res.unshift(num & 1);
      num >>= 1;
    }
    return res;
  }

  /** Encode column lists into single integer representation */
  encodeLists(fieldLists: Matrix): number {
    if (!Array.isArray(fieldLists) || fieldLists.length !== this.gameCols)
      throw new Error('Invalid field list');

    const bits: number[] = [];
    const lenBits: number[] = [];

    for (const col of fieldLists) {
      bits.push(...col);
      const freeLen = this.gameRows - col.length;
      bits.push(...Array(freeLen).fill(0));
      lenBits.push(...ConnectFour.intToBits(freeLen, this.bitsInLen));
    }

    bits.push(...lenBits);
    return ConnectFour.bitsToInt(bits);
  }

  /** Decode integer representation back into column lists */
  decodeBinary(stateInt: number): Matrix {
    const totalBits = this.gameCols * this.gameRows + this.gameCols * this.bitsInLen;
    const bits = ConnectFour.intToBits(stateInt, totalBits);

    const lenBits = bits.slice(this.gameCols * this.gameRows);
    const result: Matrix = [];

    for (let col = 0; col < this.gameCols; col++) {
      const vals = bits.slice(col * this.gameRows, (col + 1) * this.gameRows);
      const len = ConnectFour.bitsToInt(
        lenBits.slice(col * this.bitsInLen, (col + 1) * this.bitsInLen)
      );
      const trimmed = len > 0 ? vals.slice(0, -len) : vals;
      result.push(trimmed);
    }
    return result;
  }

  /** Convert MCTS integer state into matrix form (for neural net) */
  convertMctsStateToNnState(mctsState: number): Matrix {
    return this.decodeBinary(mctsState);
  }

  /** Return columns that are not full */
  possibleMoves(stateInt: number): number[] {
    const field = this.decodeBinary(stateInt);
    return field
      .map((col, idx) => (col.length < this.gameRows ? idx : -1))
      .filter((idx) => idx !== -1);
  }

  /** Return columns that are full (invalid moves) */
  invalidMoves(stateInt: number): number[] {
    const all = Array.from({ length: this.gameCols }, (_, i) => i);
    const valid = this.possibleMoves(stateInt);
    return all.filter((a) => !valid.includes(a));
  }

  statesToTrainingBatch(stateInts: number[], whoMoves: TurnType[]): number[][][][] {
    const batch: number[][][][] = [];

    for (let i = 0; i < stateInts.length; i++) {
      const state = this.convertMctsStateToNnState(stateInts[i]);
      const player = whoMoves[i];
      batch.push(this.encodeListState(state, player));
    }
    return batch;
  }

  /** Encode one list-state into [2, rows, cols] tensor */
  private encodeListState(stateList: Matrix, whoMove: TurnType): number[][][] {
    const obs = Array.from({ length: 2 }, () =>
      Array.from({ length: this.gameRows }, () => Array(this.gameCols).fill(0))
    );

    for (let colIdx = 0; colIdx < stateList.length; colIdx++) {
      const col = stateList[colIdx];
      for (let revRowIdx = 0; revRowIdx < col.length; revRowIdx++) {
        const rowIdx = this.gameRows - revRowIdx - 1;
        if (col[revRowIdx] === whoMove) obs[0][rowIdx][colIdx] = 1;
        else obs[1][rowIdx][colIdx] = 1;
      }
    }
    return obs;
  }

  /** Perform a move and return [newState, won] */
  move(stateInt: number, col: number, player: TurnType): [number, boolean] {
    if (col < 0 || col >= this.gameCols) throw new Error('Invalid column');

    const field = this.decodeBinary(stateInt);
    if (field[col].length >= this.gameRows) throw new Error('Column is full');

    field[col].push(player);

    // Check vertical win
    const suff = field[col].slice(-this.countToWin);
    let won = suff.length === this.countToWin && suff.every((v) => v === player);

    if (!won) {
      won = [0, 1, -1].some((d) => this.checkWon(field, col, d));
    }

    const newState = this.encodeLists(field);
    return [newState, won];
  }

  /** Check horizontal/diagonal win */
  private checkWon(field: Matrix, col: number, deltaRow: number): boolean {
    const player = field[col][field[col].length - 1];
    const coord = field[col].length - 1;
    let total = 1;

    // Negative direction
    let curCoord = coord - deltaRow;
    for (let c = col - 1; c >= 0; c--) {
      if (curCoord < 0 || curCoord >= this.gameRows) break;
      if (field[c].length <= curCoord) break;
      if (field[c][curCoord] !== player) break;
      total++;
      if (total === this.countToWin) return true;
      curCoord -= deltaRow;
    }

    // Positive direction
    curCoord = coord + deltaRow;
    for (let c = col + 1; c < this.gameCols; c++) {
      if (curCoord < 0 || curCoord >= this.gameRows) break;
      if (field[c].length <= curCoord) break;
      if (field[c][curCoord] !== player) break;
      total++;
      if (total === this.countToWin) return true;
      curCoord += deltaRow;
    }

    return false;
  }

  /** Render board as text (for debugging) */
  render(stateInt: number): string {
    const field = this.decodeBinary(stateInt);
    const rows = Array.from({ length: this.gameRows }, () => Array(this.gameCols).fill(' '));

    for (let c = 0; c < this.gameCols; c++) {
      const col = field[c];
      for (let r = 0; r < col.length; r++) {
        const rowIdx = this.gameRows - r - 1;
        rows[rowIdx][c] = col[r] === 1 ? 'X' : 'O';
      }
    }

    const lines = rows.map((row) => row.join(''));
    return '0123456\n-------\n' + lines.join('\n') + '\n-------\n0123456';
  }
}
