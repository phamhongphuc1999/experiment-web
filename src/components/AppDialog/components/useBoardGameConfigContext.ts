import { MyAllGameType, MyGameType } from 'src/global';
import { useCaroConfigContext } from '../CaroConfigDialog/caroConfig.context';
import { useConnect4ConfigContext } from '../Connect4ConfigDialog/connect4Config.context';
import { usePikachuConfigContext } from '../PikachuConfigDialog/pikachuConfig.context';

export default function useBoardGameConfigContext(game: MyGameType) {
  const caro = useCaroConfigContext();
  const connect4 = useConnect4ConfigContext();

  return game == 'caro' ? caro : connect4;
}

export function useAllGameConfigContext(game: MyAllGameType) {
  const caro = useCaroConfigContext();
  const connect4 = useConnect4ConfigContext();
  const pikachu = usePikachuConfigContext();

  return game == 'caro' ? caro : game == 'connect4' ? connect4 : pikachu;
}
