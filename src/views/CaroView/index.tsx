import CaroBoard from './CaroBoard';

export default function CaroView() {
  return (
    <div className="mr-8 ml-[var(--caro-left-config)] flex h-full justify-center gap-2 py-4">
      <CaroBoard className="w-fit flex-1" />
    </div>
  );
}
