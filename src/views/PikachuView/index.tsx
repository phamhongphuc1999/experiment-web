'use client';

import PikachuStateProvider from 'src/context/pikachu-state.context';
import { usePikachuStore } from 'src/states/pikachu.state';
import HeaderConfig from './HeaderConfig';
import PikachuBoard from './PikachuBoard';

export default function PikachuView() {
  const {
    metadata: { status },
  } = usePikachuStore();

  return (
    <PikachuStateProvider>
      <div className="mx-8 flex h-full justify-center gap-2 py-4">
        <div className="flex w-fit flex-1 flex-col items-center gap-2">
          <HeaderConfig />
          {status != 'init' && <PikachuBoard />}
        </div>
      </div>
    </PikachuStateProvider>
  );
}
