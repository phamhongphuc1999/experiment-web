import { pAppQuery } from 'src/services/api-query';

export default class User {
  static async findListUsers() {
    const response = await pAppQuery.get('/user');
    return response.data;
  }
}
