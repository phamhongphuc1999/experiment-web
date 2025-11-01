import { TurnType } from 'src/global';

export abstract class BaseGame {
  /**
   * The initial state of the game used to start the MCTS loop.
   */
  abstract get initialState(): number;

  /**
   * The shape of the neural network input.
   * Example: [2, 3, 3] for TicTacToe (2 players × 3×3 board)
   */
  abstract get obsShape(): number[];

  /**
   * The total number of possible actions for this game.
   * Used to size the MCTS node vectors.
   */
  abstract get actionSpace(): number;

  /**
   * Return a list of all possible legal moves for the given game state.
   * @param mctsState Current game state
   */
  abstract possibleMoves(mctsState: number): number[];

  /**
   * Return a list of all invalid (illegal) moves for the given game state.
   * Used to penalize bad actions in MCTS.
   * @param mctsState Current game state
   */
  abstract invalidMoves(mctsState: number): number[];

  /**
   * Convert a list of game states into tensors suitable for neural net training.
   * @param stateList List of game states
   * @param whoMovesList List of players who made each move
   * @returns 3D array of shape [batch, ...obsShape]
   */
  abstract statesToTrainingBatch(stateList: number[], whoMovesList: TurnType[]): number[][][][];

  /**
   * Convert a list of game states into tensors suitable for neural net training.
   * @param stateList List of game states
   * @param whoMovesList List of players who made each move
   * @returns 3D array of shape [batch, ...obsShape]
   */
  // abstract statesToTrainingBatch(stateList: number[], whoMovesList: TurnType[]): number[][][];

  /**
   * Apply a move to the given game state.
   * @param mctsState Current game state
   * @param move Action to perform
   * @param player The player performing the move (0 or 1)
   * @returns Tuple [newGameState, hasWon]
   */
  abstract move(mctsState: number, move: number, player: TurnType): [number, boolean];

  /**
   * Render a human-readable string (or array of strings) of the game state.
   * Used for debugging or display.
   * @param mctsState Current game state
   */
  abstract render(mctsState: number): string | string[];
}
