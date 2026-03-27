import PAppClient from 'src/api/papp';
import { QUERY_KEY } from 'src/configs/constance';
import useAuthQuery, { useAuthMutation } from 'src/hooks/useAuthQuery';
import { MutationOptionsDefaultError } from 'src/types/global';
import { OnlyOkResponseType } from 'src/types/papp.type';

export function useGetMe() {
  return useAuthQuery({
    queryKey: [QUERY_KEY.getMe],
    queryFn: () => PAppClient.user.getMe(),
  });
}

export function useUserSendVerifyEmail(options?: MutationOptionsDefaultError<OnlyOkResponseType>) {
  return useAuthMutation({
    ...options,
    mutationFn: () => PAppClient.user.sendVerifyEmail(),
  });
}
