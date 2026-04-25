import { pAppQuery } from 'src/services/api-query';
import { TOnlyOkResponseType, TUserType } from 'src/types/papp.type';

export default class User {
  static async getMe() {
    const response = await pAppQuery.get<TUserType>('/user/me');
    return response;
  }

  static async sendVerifyEmail() {
    const response = await pAppQuery.post<TOnlyOkResponseType>('/user/send-verify-email');
    return response;
  }
}
