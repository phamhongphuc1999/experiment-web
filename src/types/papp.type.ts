import { PaginationResponseType } from './global';

export enum USER_ROLE {
  USER = 1,
  ADMIN = 2,
}

export enum USER_STATUS {
  EMAIL_INACTIVE = 1,
  ACTIVE = 2,
  INACTIVE = 3,
}

export enum CONVERSATION_TYPE {
  GROUP = 1,
  PRIVATE = 2,
}

export enum CONVERSATION_USER_ROLE {
  USER = 1,
  ADMIN = 2,
}

export type AuthSignupDto = {
  name: string;
  password: string;
  email: string;
};

export type VerifyTokenDto = {
  token: string;
};

export type GoogleSigninDto = {
  idToken: string;
};

export type PasswordLoginDto = {
  email: string;
  password: string;
};

export type GoogleRecoverPasswordDto = {
  idToken: string;
};

export type RecoverTokenDto = {
  token: string;
  newPassword: string;
};

export type OnlyOkResponseType = {
  isOk: boolean;
};

export type AccessTokenResponseType = {
  accessToken: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  role: USER_ROLE;
  status: USER_STATUS;
};

export type CreatePrivateChatDto = {
  partnerId: number;
};

export type ConversationType = {
  id: number;
  name: string;
  type: number;
  hash: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type ConversationParticipantType = {
  id: number;
  role: number;
  conversation: ConversationType;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type ParticipantItemType = {
  id: number;
  name: string;
  email: string;
};

export type ConversationItemType = {
  conversationId: number;
  conversationName: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  id: number;
  role: CONVERSATION_USER_ROLE;
  groupType: CONVERSATION_TYPE;

  yourParticipant: ParticipantItemType;
  anotherParticipant: ParticipantItemType | null;
};

export type ConversationResponseType = {
  data: Array<ConversationItemType>;
  metadata: PaginationResponseType;
};
