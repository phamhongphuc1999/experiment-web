import PAppClient from 'src/api/papp';
import { QUERY_KEY } from 'src/configs/constance';
import useAuthQuery, { useAuthMutation } from 'src/hooks/useAuthQuery';
import { MutationOptionsDefaultError } from 'src/types/global';
import { ConversationType, CreatePrivateChatDto } from 'src/types/papp.type';

export function useCreatePrivateChat(
  options?: MutationOptionsDefaultError<ConversationType, CreatePrivateChatDto>
) {
  return useAuthMutation({
    ...options,
    mutationFn: (data: CreatePrivateChatDto) => PAppClient.conversation.createPrivateChat(data),
  });
}

export function useGetListConversations(params?: { page?: number; limit?: number }) {
  return useAuthQuery({
    queryKey: [QUERY_KEY.getListConversations, params],
    queryFn: () => PAppClient.conversation.getListConversations(params),
  });
}
