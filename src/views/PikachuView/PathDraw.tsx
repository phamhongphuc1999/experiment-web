import { PIKACHU_PIECE_HEIGHT, PIKACHU_PIECE_WIDTH } from 'src/configs/constance';
import { PositionType } from 'src/global';

function getMetadata(fromPosition: PositionType, toPosition: PositionType) {
  const xDistance = fromPosition[1] - toPosition[1];
  const yDistance = fromPosition[0] - toPosition[0];
  const mode = xDistance != 0 ? 'width' : 'height';
  if (mode == 'width') {
    const _left = Math.min(fromPosition[1], toPosition[1]);
    return {
      left: _left * (PIKACHU_PIECE_WIDTH + 1) - PIKACHU_PIECE_WIDTH / 2,
      top: fromPosition[0] * (PIKACHU_PIECE_HEIGHT + 1) - PIKACHU_PIECE_HEIGHT / 2,
      width: Math.abs(xDistance) * (PIKACHU_PIECE_WIDTH + 1),
      height: '2px',
    };
  } else {
    const _top = Math.min(fromPosition[0], toPosition[0]);
    return {
      left: fromPosition[1] * (PIKACHU_PIECE_WIDTH + 1) - PIKACHU_PIECE_WIDTH / 2,
      top: _top * (PIKACHU_PIECE_HEIGHT + 1) - PIKACHU_PIECE_HEIGHT / 2,
      width: '2px',
      height: Math.abs(yDistance) * (PIKACHU_PIECE_HEIGHT + 1),
    };
  }
}

interface Props {
  selectedPath: Array<PositionType>;
}

export default function PathDraw({ selectedPath }: Props) {
  return (
    <>
      {selectedPath.slice(1).map((toPosition, index) => {
        const fromPosition = selectedPath[index];
        const { left, top, width, height } = getMetadata(fromPosition, toPosition);

        return (
          <div
            key={index}
            style={{ width, height, left, top, backgroundColor: 'yellow' }}
            className="absolute"
          />
        );
      })}
    </>
  );
}
