import { pAppQuery } from 'src/services/api-query';
import {
  TAccessTokenResponseType,
  TAuthSignupDto,
  TGoogleRecoverPasswordDto,
  TGoogleSigninDto,
  TOnlyOkResponseType,
  TPasswordLoginDto,
  TRecoverTokenDto,
  TVerifyTokenDto,
} from 'src/types/papp.type';

export default class Auth {
  static async signup(params: TAuthSignupDto) {
    const response = await pAppQuery.post<TOnlyOkResponseType>('/auth/signup', params);
    return response;
  }

  static async verifyEmail(params: TVerifyTokenDto) {
    const response = await pAppQuery.post<TOnlyOkResponseType>('/auth/verify-email', params);
    return response;
  }

  static async googleLogin(params: TGoogleSigninDto) {
    const response = await pAppQuery.post<TAccessTokenResponseType>('/auth/signin/google', params, {
      withCredentials: true,
    });
    return response;
  }

  static async signinWithPassword(params: TPasswordLoginDto) {
    const response = await pAppQuery.post<TAccessTokenResponseType>(
      '/auth/signin/password',
      params,
      { withCredentials: true }
    );
    return response;
  }

  static async sendRecoverMailPassword(params: TGoogleRecoverPasswordDto) {
    const response = await pAppQuery.post<TOnlyOkResponseType>(
      '/auth/forgot-password/send-recovery',
      params
    );
    return response;
  }

  static async recoverPassword(params: TRecoverTokenDto) {
    const response = await pAppQuery.post<TOnlyOkResponseType>(
      '/auth/forgot-password/recovery',
      params
    );
    return response;
  }

  static async refresh() {
    const response = await pAppQuery.post<TAccessTokenResponseType>(
      '/auth/refresh',
      {},
      { withCredentials: true }
    );
    return response;
  }
}
