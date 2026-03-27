import { pAppQuery } from 'src/services/api-query';
import {
  ConversationType,
  CreatePrivateChatDto,
  GetListConversationResponseType,
  GetPrivateConversationResponseType,
} from 'src/types/papp.type';

export default class Conversation {
  static async createPrivateChat(params: CreatePrivateChatDto) {
    const response = await pAppQuery.post<ConversationType>('/conversation/create', params);
    return response;
  }

  static async getListConversations(params?: { page?: number; limit?: number }) {
    const response = await pAppQuery.get<GetListConversationResponseType>(
      '/conversation/conversations',
      { params }
    );
    return response;
  }

  static async getPrivateConversation(conversationId: number) {
    const response = await pAppQuery.get<GetPrivateConversationResponseType>(
      `/conversation/private-conversation/${conversationId}`
    );
    return response;
  }
}
