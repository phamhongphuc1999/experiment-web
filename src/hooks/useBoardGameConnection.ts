import { useCaroConnectionContext } from 'src/context/caro-connection.context';
import { useConnect4ConnectionContext } from 'src/context/connect4-connection.context';
import { MyGameType } from 'src/global';

export default function useBoardGameConnectionContext(game: MyGameType) {
  const caro = useCaroConnectionContext();
  const connect4 = useConnect4ConnectionContext();

  return game == 'caro' ? caro : connect4;
}
