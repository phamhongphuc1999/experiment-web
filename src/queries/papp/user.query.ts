import PAppClient from 'src/api/papp';
import { QUERY_KEY } from 'src/configs/constance';
import useAuthQuery from 'src/hooks/useAuthQuery';

export function useGetMe() {
  return useAuthQuery({
    queryKey: [QUERY_KEY.getMe],
    queryFn: () => PAppClient.user.getMe(),
  });
}
