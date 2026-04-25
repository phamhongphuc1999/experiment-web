import { TPaginationResponseType } from './global';

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

export type TAuthSignupDto = {
  name: string;
  password: string;
  email: string;
};

export type TVerifyTokenDto = {
  token: string;
};

export type TGoogleSigninDto = {
  idToken: string;
};

export type TPasswordLoginDto = {
  email: string;
  password: string;
};

export type TGoogleRecoverPasswordDto = {
  idToken: string;
};

export type TRecoverTokenDto = {
  token: string;
  newPassword: string;
};

export type TOnlyOkResponseType = {
  isOk: boolean;
};

export type TAccessTokenResponseType = {
  accessToken: string;
};

export type TUserType = {
  id: number;
  name: string;
  email: string;
  role: USER_ROLE;
  status: USER_STATUS;
};

export type TCreatePrivateChatDto = {
  partnerId: number;
};

export type TConversationType = {
  id: number;
  name: string;
  type: number;
  hash: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type TConversationParticipantType = {
  id: number;
  role: number;
  conversation: TConversationType;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type TParticipantItemType = {
  id: number;
  name: string;
  email: string;
};

export type TConversationItemType = {
  conversationId: number;
  conversationName: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  id: number;
  role: CONVERSATION_USER_ROLE;
  groupType: CONVERSATION_TYPE;

  yourParticipant: TParticipantItemType;
  anotherParticipant: TParticipantItemType | null;
};

export type TConversationResponseType = {
  data: Array<TConversationItemType>;
  metadata: TPaginationResponseType;
};
