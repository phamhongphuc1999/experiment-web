import { useMutation } from '@tanstack/react-query';
import PAppClient from 'src/api/papp';
import { TMutationOptionsDefaultError } from 'src/types/global';
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

export function useSignup(
  options?: TMutationOptionsDefaultError<TOnlyOkResponseType, TAuthSignupDto>
) {
  return useMutation({
    ...options,
    mutationFn: (data: TAuthSignupDto) => PAppClient.auth.signup(data),
  });
}

export function useVerifyEmail(
  options?: TMutationOptionsDefaultError<TOnlyOkResponseType, TVerifyTokenDto>
) {
  return useMutation({
    ...options,
    mutationFn: (data: TVerifyTokenDto) => PAppClient.auth.verifyEmail(data),
  });
}

export function useGoogleLogin(
  options?: TMutationOptionsDefaultError<TAccessTokenResponseType, TGoogleSigninDto>
) {
  return useMutation({
    ...options,
    mutationFn: (data: TGoogleSigninDto) => PAppClient.auth.googleLogin(data),
  });
}

export function usePasswordLogin(
  options?: TMutationOptionsDefaultError<TAccessTokenResponseType, TPasswordLoginDto>
) {
  return useMutation({
    ...options,
    mutationFn: async (data: TPasswordLoginDto) => PAppClient.auth.signinWithPassword(data),
  });
}

export function useSendRecoverPassword() {
  return useMutation({
    mutationFn: (data: TGoogleRecoverPasswordDto) => PAppClient.auth.sendRecoverMailPassword(data),
  });
}

export function useRecoverPassword() {
  return useMutation({
    mutationFn: (data: TRecoverTokenDto) => PAppClient.auth.recoverPassword(data),
  });
}

export function useRefresh(options?: TMutationOptionsDefaultError<TAccessTokenResponseType, void>) {
  return useMutation({
    ...options,
    mutationFn: () => PAppClient.auth.refresh(),
  });
}
