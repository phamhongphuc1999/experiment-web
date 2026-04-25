import { pAppQuery } from 'src/services/api-query';
import {
  TConversationResponseType,
  TConversationType,
  TCreatePrivateChatDto,
} from 'src/types/papp.type';

export default class Conversation {
  static async createPrivateChat(params: TCreatePrivateChatDto) {
    const response = await pAppQuery.post<TConversationType>('/conversation/create', params);
    return response;
  }

  static async getListConversations(params?: { page?: number; limit?: number }) {
    const response = await pAppQuery.get<TConversationResponseType>('/conversation/conversations', {
      params,
    });
    return response;
  }
}
