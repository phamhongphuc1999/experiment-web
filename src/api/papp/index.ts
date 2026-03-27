import Auth from './auth';
import Conversation from './conversation';
import User from './user';

export default class PAppClient {
  static auth = Auth;
  static user = User;
  static conversation = Conversation;
}
