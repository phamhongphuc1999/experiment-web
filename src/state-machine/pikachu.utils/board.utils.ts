import cloneDeep from 'lodash.clonedeep';
import { toast } from 'sonner';
import { getRandom, isPositionEqual, sleep } from 'src/services';
import PikachuService from 'src/services/pikachu';
import { usePikachuStore } from 'src/states/pikachu.state';
import { PikachuContextType, PikachuMoveEventType } from 'src/types/pikachu.type';

export function changeBoardAction(): Partial<PikachuContextType> {
  const state = usePikachuStore.getState();
  const { numberOfRows, numberOfColumns, numberOfLines, imgType } = state.metadata;
  const { board, path } = PikachuService.changeBoard({
    currentBoard: state.board,
    numberOfRows,
    numberOfColumns,
    numberOfLines,
    numTypes: imgType == 'internal' ? 90 : 1025,
  });
  state.fn.changeBoard(board, path);
  return {};
}

export function move(
  context: PikachuContextType,
  { position }: PikachuMoveEventType
): Partial<PikachuContextType> {
  const { board, metadata } = usePikachuStore.getState();
  const {
    numberOfRows,
    numberOfColumns,
    numberOfLines,
    gameType,
    roundList,
    round,
    randomRoundListIndex,
  } = metadata;
  if (board[position[0]][position[1]] == 0) return {};
  if (context.position == undefined) return { position };
  else if (isPositionEqual(context.position, position)) return { position: undefined };
  else {
    const cloneBoard = cloneDeep(board);
    const path = PikachuService.findPath({
      board: cloneBoard,
      sourcePiece: context.position,
      targetPiece: position,
      numberOfRows,
      numberOfColumns,
      numberOfLines,
    });
    if (path) {
      const transformType =
        gameType != 'randomBoard' ? roundList[round - 1] : roundList[randomRoundListIndex];
      PikachuService.transform(
        { board: cloneBoard, moves: [context.position, position], numberOfRows, numberOfColumns },
        transformType
      );
      let randomCounter = context.randomCounter;
      const { fn } = usePikachuStore.getState();
      if (gameType == 'randomBoard') {
        if (context.randomCounter >= 5) {
          const randomRoundListIndex = getRandom(roundList.length);
          fn.setMetadata({ randomRoundListIndex });
          randomCounter = 1;
          PikachuService.format(
            { board: cloneBoard, numberOfRows, numberOfColumns },
            roundList[randomRoundListIndex]
          );
        } else randomCounter += 1;
      }
      const possiblePath = PikachuService.findPathWithoutTarget({
        board: cloneBoard,
        numberOfRows,
        numberOfColumns,
        numberOfLines,
      });
      if (possiblePath)
        sleep(150).then(() => {
          fn.movePath(cloneBoard, possiblePath);
        });
      else if (possiblePath === null) {
        toast.warning('Out of move, please change board');
        sleep(150).then(() => {
          fn.moveChangeBoard(cloneBoard);
        });
      }
      // else {
      //   sleep(200).then(() => {
      //     if (gameType != 'randomBoard')
      //       send({ type: PikachuMachineEvent.CREATE, mode: 'nextRound' });
      //     else send({ type: PikachuMachineEvent.CREATE, mode: 'newGame' });
      //   });
      // }

      // if (showHint && hintCountdown > 0) {
      //   const latestIndex = suggestion.length - 1;
      //   const firstCheck =
      //     isPositionEqual(firstPiece, suggestion[0]) ||
      //     isPositionEqual(firstPiece, suggestion[latestIndex]);
      //   const secondCheck =
      //     isPositionEqual(position, suggestion[0]) ||
      //     isPositionEqual(position, suggestion[latestIndex]);
      //   if (firstCheck && secondCheck) setShowHint(false);
      // }
      return { randomCounter, selectedPath: path };
    }
  }
  return {};
}
