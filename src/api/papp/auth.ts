import { pAppQuery } from 'src/services/api-query';
import {
  AccessTokenResponseType,
  AuthSignupDto,
  GoogleRecoverPasswordDto,
  GoogleSigninDto,
  OnlyOkResponseType,
  PasswordLoginDto,
  RecoverTokenDto,
  VerifyTokenDto,
} from 'src/types/papp.type';

export default class Auth {
  static async signup(params: AuthSignupDto) {
    const response = await pAppQuery.post<OnlyOkResponseType>('/auth/signup', params);
    return response.data;
  }

  static async verifyEmail(params: VerifyTokenDto) {
    const response = await pAppQuery.post<OnlyOkResponseType>('/auth/verify-email', params);
    return response.data;
  }

  static async googleLogin(params: GoogleSigninDto) {
    const response = await pAppQuery.post<AccessTokenResponseType>('/auth/signin/google', params);
    return response.data;
  }

  static async signinWithPassword(params: PasswordLoginDto) {
    const response = await pAppQuery.post<AccessTokenResponseType>('/auth/signin/password', params);
    return response.data;
  }

  static async sendRecoverMailPassword(params: GoogleRecoverPasswordDto) {
    const response = await pAppQuery.post<OnlyOkResponseType>(
      '/auth/forgot-password/send-recovery',
      params
    );
    return response.data;
  }

  static async recoverPassword(params: RecoverTokenDto) {
    const response = await pAppQuery.post<OnlyOkResponseType>(
      '/auth/forgot-password/recovery',
      params
    );
    return response.data;
  }
}
