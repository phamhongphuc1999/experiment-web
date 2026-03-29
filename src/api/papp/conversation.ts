import { pAppQuery } from 'src/services/api-query';
import {
  ConversationResponseType,
  ConversationType,
  CreatePrivateChatDto,
} from 'src/types/papp.type';

export default class Conversation {
  static async createPrivateChat(params: CreatePrivateChatDto) {
    const response = await pAppQuery.post<ConversationType>('/conversation/create', params);
    return response;
  }

  static async getListConversations(params?: { page?: number; limit?: number }) {
    const response = await pAppQuery.get<ConversationResponseType>('/conversation/conversations', {
      params,
    });
    return response;
  }
}
