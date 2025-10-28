import Connect4ConnectionProvider from 'src/context/connect4-connection.context';
import Connect4StateProvider from 'src/context/connect4-state.context';
import Connect4Board from './Connect4Board';

export default function Connect4View() {
  return (
    <Connect4ConnectionProvider>
      <Connect4StateProvider>
        <div className="mx-8 flex h-full justify-center gap-2 py-4">
          <Connect4Board className="w-fit flex-1" />
        </div>
      </Connect4StateProvider>
    </Connect4ConnectionProvider>
  );
}
