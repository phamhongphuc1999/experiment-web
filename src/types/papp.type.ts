export enum USER_ROLE {
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
};
