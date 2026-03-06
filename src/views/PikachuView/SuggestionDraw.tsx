import { usePikachuStore } from 'src/states/pikachu.state';

interface Props {
  size: number;
}

export default function SuggestionDraw({ size }: Props) {
  const { suggestion } = usePikachuStore();
  const firstPiece = suggestion[0];
  const secondPiece = suggestion[suggestion.length - 1];

  return (
    <div className="pointer-events-none">
      <div
        style={{ width: size, height: size, left: firstPiece[1] * size, top: firstPiece[0] * size }}
        className="absolute border border-[red]"
      />
      <div
        style={{
          width: size,
          height: size,
          left: secondPiece[1] * size,
          top: secondPiece[0] * size,
        }}
        className="absolute border border-[red]"
      />
    </div>
  );
}
