import { PIKACHU_NUMBER_OF_COLUMNS, PIKACHU_NUMBER_OF_ROWS } from 'src/configs/constance';
import { PositionType } from 'src/global';

/**
 * Create a Pikachu game board with paired tiles.
 * @param rows Number of rows
 * @param cols Number of columns
 * @param numTypes Number of different tile images (e.g., 36 for pieces0.png → pieces36.png)
 * @returns 2D array of tile IDs
 */
export function createBoard(rows: number, cols: number, numTypes: number): number[][] {
  const totalCells = rows * cols;
  if (totalCells % 2 !== 0) {
    throw new Error('Total number of cells must be even for matching pairs.');
  }

  // Create list of tile IDs that appear in pairs
  const tileIds: number[] = [];
  const halfCells = totalCells / 2;

  for (let i = 0; i < halfCells; i++) {
    const id = (i % numTypes) + 1; // e.g., 1 → numTypes
    tileIds.push(id);
  }

  // Duplicate to form pairs
  const pairedTiles = [...tileIds, ...tileIds];

  // Shuffle tiles
  for (let i = pairedTiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairedTiles[i], pairedTiles[j]] = [pairedTiles[j], pairedTiles[i]];
  }

  // Fill into 2D grid
  const board: number[][] = [];
  for (let r = 0; r < rows; r++) {
    const row = pairedTiles.slice(r * cols, (r + 1) * cols);
    board.push(row);
  }

  return board;
}

export function createNewPikachuBoard() {
  const board = createBoard(PIKACHU_NUMBER_OF_ROWS, PIKACHU_NUMBER_OF_COLUMNS, 36);
  const moveBoard: Array<Array<number>> = [];
  for (let i = 0; i < PIKACHU_NUMBER_OF_ROWS; i++) {
    moveBoard.push(Array(PIKACHU_NUMBER_OF_COLUMNS).fill(1));
  }
  return { board, moveBoard };
}

export function performPikachuMove(sourcePiece: PositionType, targetPiece: PositionType) {
  //
}
