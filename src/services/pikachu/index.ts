import { PikachuMoveParamsType } from 'src/global';
import { findPossibleMove, performPikachuMove } from './pikachu.utils';
import { pikachuBoardTransformByRound } from './pikachuBoardTransform.utils';

export function analyticPikachuMove(params: PikachuMoveParamsType, round: number) {
  const { numberOfRows, numberOfColumns } = params;
  const path = performPikachuMove(params);
  if (path) {
    const _board = pikachuBoardTransformByRound(params, round);
    const possibleFuturePath = findPossibleMove({ board: _board, numberOfRows, numberOfColumns });
    return { possibleFuturePath, board: _board };
  }
}
