import { pAppQuery } from 'src/services/api-query';
import { UserType } from 'src/types/papp.type';

export default class User {
  static async getMe() {
    const response = await pAppQuery.get<UserType>('/user/me');
    return response;
  }
}
