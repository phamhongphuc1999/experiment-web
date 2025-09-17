import { PairTableType } from 'src/global';
import { randomSubGroup } from 'src/services';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type ResultPairType = {
  generalError: string;
  num: Array<number>;
  reorderPairs: Array<PairTableType>;
  points: { [id: string]: { userEn: string; status: 'correct' | 'wrong' } };
  numberOfOk: number;
  numberOfError: number;
};

export type WordPairsStateType = {
  status: 'init' | 'playing' | 'showError' | 'revealing' | 'reset' | 'learning';
  currentRound: number;
  pairs: { [id: string]: PairTableType };
  result: { [round: number]: ResultPairType };
  init: (pairs: Array<PairTableType>) => void;
  events: {
    changeEn: (id: string, value: string) => void;
    onCheck: () => void;
    onLearn: () => void;
    onReveal: () => void;
    onNextRound: (isFillFromScratch: boolean) => void;
  };
};

export const useWordPairsStore = create<WordPairsStateType, [['zustand/immer', unknown]]>(
  immer((set) => {
    return {
      status: 'init',
      currentRound: 1,
      pairs: {},
      result: {},
      init: (pairs: Array<PairTableType>) => {
        set((state) => {
          state.status = 'init';
          const _pairs: { [id: string]: PairTableType } = {};
          pairs.forEach((pair) => {
            _pairs[pair.id] = pair;
          });
          state.pairs = _pairs;
          const num = randomSubGroup(pairs.length);
          const reorderPairs: Array<PairTableType> = [];
          const points: { [id: string]: { userEn: string; status: 'correct' | 'wrong' } } = {};
          for (const _n of num) {
            reorderPairs.push(pairs[_n]);
            points[pairs[_n].id] = { userEn: '', status: 'wrong' };
          }
          state.currentRound = 1;
          state.result = {
            1: {
              generalError: '',
              num,
              reorderPairs,
              points,
              numberOfOk: 0,
              numberOfError: pairs.length,
            },
          };
          state.status = 'playing';
        });
      },
      events: {
        changeEn: (id: string, value: string) => {
          set((state) => {
            const answer = state.pairs[id];
            const status = value == answer.en ? 'correct' : 'wrong';
            state.result[state.currentRound].points[id] = { userEn: value, status };
          });
        },
        onCheck: () => {
          set((state) => {
            const points = state.result[state.currentRound].points;
            let okCounter = 0;
            let errorCounter = 0;
            let generalError = '';
            for (const point of Object.values(points)) {
              if (point.userEn == '') {
                generalError = 'Please fill all words';
                break;
              }
              if (point.status == 'correct') okCounter++;
              else errorCounter++;
            }
            if (generalError.length > 0)
              state.result[state.currentRound].generalError = generalError;
            else {
              state.result[state.currentRound].generalError = '';
              if (errorCounter == 0) state.status = 'reset';
              else {
                state.result[state.currentRound].numberOfOk = okCounter;
                state.result[state.currentRound].numberOfError = errorCounter;
                state.status = 'showError';
              }
            }
          });
        },
        onLearn: () => {
          set((state) => {
            state.status = 'learning';
          });
        },
        onReveal: () => {
          set((state) => {
            state.status = 'revealing';
          });
        },
        onNextRound: (isFillFromScratch: boolean) => {
          set((state) => {
            if (isFillFromScratch) {
              const _pairs = Object.values(state.pairs);
              const num = randomSubGroup(_pairs.length);
              const reorderPairs: Array<PairTableType> = [];
              const points: { [id: string]: { userEn: string; status: 'correct' | 'wrong' } } = {};
              for (const _n of num) {
                reorderPairs.push(_pairs[_n]);
                points[_pairs[_n].id] = { userEn: '', status: 'wrong' };
              }
              state.result = {
                ...state.result,
                [state.currentRound + 1]: {
                  generalError: '',
                  num,
                  reorderPairs,
                  points,
                  numberOfOk: 0,
                  numberOfError: _pairs.length,
                },
              };
            } else {
              const currentResult = state.result[state.currentRound].points;
              const _pairs: Array<PairTableType> = [];
              for (const pair of state.result[state.currentRound].reorderPairs) {
                const _result = currentResult[pair.id];
                if (_result.status == 'wrong') _pairs.push(pair);
              }

              const num = randomSubGroup(_pairs.length);
              const reorderPairs: Array<PairTableType> = [];
              const points: { [id: string]: { userEn: string; status: 'correct' | 'wrong' } } = {};
              for (const _n of num) {
                reorderPairs.push(_pairs[_n]);
                points[_pairs[_n].id] = { userEn: '', status: 'wrong' };
              }
              state.result = {
                ...state.result,
                [state.currentRound + 1]: {
                  generalError: '',
                  num,
                  reorderPairs,
                  points,
                  numberOfOk: 0,
                  numberOfError: _pairs.length,
                },
              };
            }
            state.status = 'playing';
            state.currentRound = state.currentRound + 1;
          });
        },
      },
    };
  })
);
