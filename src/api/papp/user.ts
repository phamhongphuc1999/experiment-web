import { pAppQuery } from 'src/services/api-query';
import { OnlyOkResponseType, UserType } from 'src/types/papp.type';

export default class User {
  static async getMe() {
    const response = await pAppQuery.get<UserType>('/user/me');
    return response;
  }

  static async sendVerifyEmail() {
    const response = await pAppQuery.post<OnlyOkResponseType>('/user/send-verify-email');
    return response;
  }
}
