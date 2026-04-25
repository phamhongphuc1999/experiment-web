import { useCaroConnectionContext } from 'src/context/caro-connection.context';
import { useConnect4ConnectionContext } from 'src/context/connect4-connection.context';
import { TMyGameType } from 'src/types/caro.type';

export default function useBoardGameConnectionContext(game: TMyGameType) {
  const caro = useCaroConnectionContext();
  const connect4 = useConnect4ConnectionContext();

  return game == 'caro' ? caro : connect4;
}
