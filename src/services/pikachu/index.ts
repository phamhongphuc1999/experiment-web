import { changePikachuBoard, createNewPikachuBoard } from './board.utils';
import { pikachuBoardFormat } from './format.utils';
import { findPath, findPathWithoutTarget } from './move.utils';
import { pikachuBoardTransform } from './transform.utils';

const PikachuService = {
  format: pikachuBoardFormat,
  transform: pikachuBoardTransform,
  findPath: findPath,
  findPathWithoutTarget: findPathWithoutTarget,
  createNewBoard: createNewPikachuBoard,
  changeBoard: changePikachuBoard,
};

export default PikachuService;
