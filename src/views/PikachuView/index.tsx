import PikachuBoard from './PikachuBoard';

export default function PikachuView() {
  return (
    <div className="mx-8 flex h-full justify-center gap-2 py-4">
      <PikachuBoard className="w-fit flex-1" />
    </div>
  );
}
