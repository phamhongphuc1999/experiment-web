'use client';

import {
  ComponentProps,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';
import GameWinLines from 'src/components/games/GameWinLines';
import { MAX_CONNECT4_BOARD_SIZE } from 'src/configs/constance';
import { useConnect4StateContext } from 'src/context/connect4-state.context';
import useSoundtrack from 'src/hooks/useSoundtrack';
import { cn } from 'src/lib/utils';
import { useConnect4Store } from 'src/states/connect4.state';
import HeaderConfig from './HeaderConfig';
import { ConnectFour } from 'src/services/models/ConnectFour';
import { MCTS } from 'src/services/models/MCTS';
import Connect4Model from 'src/services/models/connect4-model';
import { drawMatrix } from 'src/services';
import { BOT_MCTS_BATCH_SIZE, BOT_MCTS_SEARCHES } from 'src/configs/model.config';

export default function Connect4Board(props: ComponentProps<'div'>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState(0);
  const {
    metadata: { numberOfRows, numberOfColumns, gameType, isMute },
    isBlindForceOver,
    steps,
    stepsOrder,
    winState,
    turn,
    fn: { countNumberOfBlindError },
  } = useConnect4Store();
  const { playMove, playError } = useSoundtrack();
  const {
    fn: { move },
  } = useConnect4StateContext();

  const _abc = useCallback(async () => {
    const game = new ConnectFour();
    const mcts_store = new MCTS(game);
    let state = game.initialState;
    let won = false;
    const model = new Connect4Model();
    await model.loadConnect4Model();

    [state, won] = game.move(state, 0, 0);
    drawMatrix(game.decodeBinary(state));
    const valid_moves = game.possibleMoves(state);

    await mcts_store.searchBatch(BOT_MCTS_SEARCHES, BOT_MCTS_BATCH_SIZE, state, 1, model);
    const [probs, values] = mcts_store.getPolicyValue(state, 0);
  }, []);

  useEffect(() => {
    _abc();
  }, [_abc]);

  const { itemSize } = useMemo(() => {
    return { itemSize: size * 0.7 };
  }, [size]);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const measure = () => {
      if (!ref.current) return;
      const { width, height } = ref.current.getBoundingClientRect();
      const _column = (width - numberOfColumns - 1) / numberOfColumns;
      const _row = (height - numberOfRows - 1) / numberOfRows;
      setSize(Math.min(_column, _row, MAX_CONNECT4_BOARD_SIZE));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [numberOfColumns, numberOfRows]);

  function onMove(column: number) {
    const isWin = winState != undefined || isBlindForceOver == true;

    if (steps?.[column] && steps[column].length >= numberOfRows) {
      toast.warning('Invalid move');
      playError(isMute);
      if (gameType == 'blind') countNumberOfBlindError(turn);
    } else if (!isWin) {
      move(column);
      playMove(isMute);
    } else playError(isMute);
  }

  const isWin = useMemo(() => {
    return winState != undefined || isBlindForceOver == true;
  }, [isBlindForceOver, winState]);

  const { currentRow, currentColumn } = useMemo(() => {
    const currentColumn = stepsOrder.at(-1);
    if (currentColumn != undefined) {
      const currentRow = steps[currentColumn].length - 1;
      return { currentRow, currentColumn };
    }
    return { currentRow: undefined, currentColumn };
  }, [steps, stepsOrder]);

  return (
    <div {...props} className={cn('flex flex-col items-center gap-2', props.className)}>
      <HeaderConfig />
      <div ref={ref} className="flex h-full w-full justify-center overflow-hidden">
        {size > 0 && (
          <div
            style={{
              width: numberOfColumns * size + numberOfColumns + 1,
              height: numberOfRows * size + numberOfRows + 1,
            }}
            className="bg-border border-px border-ring flex flex-wrap gap-px border"
          >
            {Array.from({ length: numberOfColumns }).map((_, column) => {
              return (
                <div
                  key={column}
                  className="connect4-column flex flex-col-reverse justify-between"
                  onClick={() => onMove(column)}
                >
                  {Array.from({ length: numberOfRows }).map((_, row) => {
                    const _turn = steps[column]?.[row];
                    const _winTypes = winState?.locations[`${row}_${column}`];
                    const isCurrentMove = currentColumn == column && currentRow == row;
                    const isShouldShowMove =
                      gameType != 'blind' || (gameType == 'blind' && (isWin || isCurrentMove));

                    return (
                      <div
                        key={`${row}_${column}`}
                        className={cn(
                          'connect4-item bg-background relative flex cursor-pointer items-center justify-center',
                          _turn == undefined && 'connect4-item-turn-undefined'
                        )}
                        style={{ width: size, height: size, fontSize: size * 0.7 }}
                      >
                        {_turn == 0 && isShouldShowMove && (
                          <div
                            className="border-chart-1 rounded-full border-4"
                            style={{ width: itemSize, height: itemSize }}
                          />
                        )}
                        {_turn == 1 && isShouldShowMove && (
                          <div
                            className="border-chart-2 rounded-full border-4"
                            style={{ width: itemSize, height: itemSize }}
                          />
                        )}
                        <GameWinLines turn={_turn} winTypes={_winTypes} />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
