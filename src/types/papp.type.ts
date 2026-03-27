/* eslint-disable @typescript-eslint/no-explicit-any */
export enum USER_ROLE {
  USER = 1,
  ADMIN = 2,
}

export enum USER_STATUS {
  EMAIL_INACTIVE = 1,
  ACTIVE = 2,
  INACTIVE = 3,
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

export type PaginationResponseType = {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

export type ConversationType = any; // Schema was empty in swagger

export type GetListConversationResponseType = {
  data: any[];
  metadata: PaginationResponseType;
};

export type GetPrivateConversationResponseType = {
  conversation: ConversationType;
};
