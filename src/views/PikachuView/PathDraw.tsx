import { PositionType } from 'src/types/global';

function getMetadata(fromPosition: PositionType, toPosition: PositionType, size: number) {
  const xDistance = fromPosition[1] - toPosition[1];
  const yDistance = fromPosition[0] - toPosition[0];
  const mode = xDistance != 0 ? 'width' : 'height';
  if (mode == 'width') {
    const _left = Math.min(fromPosition[1], toPosition[1]);
    return {
      left: _left * size + size / 2 - 1,
      top: fromPosition[0] * size + size / 2 - 1,
      width: Math.abs(xDistance) * size + 2,
      height: '2px',
    };
  } else {
    const _top = Math.min(fromPosition[0], toPosition[0]);
    return {
      left: fromPosition[1] * size + size / 2 - 1,
      top: _top * size + size / 2 - 1,
      width: '2px',
      height: Math.abs(yDistance) * size + 2,
    };
  }
}

interface Props {
  size: number;
  selectedPath: Array<PositionType>;
}

export default function PathDraw({ size, selectedPath }: Props) {
  return (
    <>
      {selectedPath.slice(1).map((toPosition, index) => {
        const fromPosition = selectedPath[index];
        const { left, top, width, height } = getMetadata(fromPosition, toPosition, size);

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
