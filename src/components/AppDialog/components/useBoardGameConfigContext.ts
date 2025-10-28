import { MyGameType } from 'src/global';
import { useCaroConfigContext } from '../CaroConfigDialog/caroConfig.context';
import { useConnect4ConfigContext } from '../Connect4ConfigDialog/connect4Config.context';

export default function useBoardGameConfigContext(game: MyGameType) {
  const caro = useCaroConfigContext();
  const connect4 = useConnect4ConfigContext();

  return game == 'caro' ? caro : connect4;
}
