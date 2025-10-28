import CaroConnectionProvider from 'src/context/caro-connection.context';
import CaroStateProvider from 'src/context/caro-state.context';
import CaroBoard from './CaroBoard';

export default function CaroView() {
  return (
    <CaroConnectionProvider>
      <CaroStateProvider>
        <div className="mx-8 flex h-full justify-center gap-2 py-4">
          <CaroBoard className="w-fit flex-1" />
        </div>
      </CaroStateProvider>
    </CaroConnectionProvider>
  );
}
