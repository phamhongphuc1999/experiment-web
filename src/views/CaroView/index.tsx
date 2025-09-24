'use client';

import CaroConnectionProvider from 'src/context/caroConnection.context';
import CaroBoard from './CaroBoard';

export default function CaroView() {
  return (
    <CaroConnectionProvider>
      <div className="mx-8 flex h-full justify-center gap-2 py-4">
        <CaroBoard className="w-fit flex-1" />
      </div>
    </CaroConnectionProvider>
  );
}
