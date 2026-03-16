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
        className="animate-pulse-soft absolute rounded-lg border border-amber-400/70 shadow-[0_0_16px_rgba(251,191,36,0.35)] dark:border-amber-300/80 dark:shadow-[0_0_18px_rgba(251,191,36,0.7)]"
      />
      <div
        style={{
          width: size,
          height: size,
          left: secondPiece[1] * size,
          top: secondPiece[0] * size,
        }}
        className="animate-pulse-soft absolute rounded-lg border border-amber-400/70 shadow-[0_0_16px_rgba(251,191,36,0.35)] dark:border-amber-300/80 dark:shadow-[0_0_18px_rgba(251,191,36,0.7)]"
      />
    </div>
  );
}
