import { useMutation } from '@tanstack/react-query';
import PAppClient from 'src/api/papp';
import { MutationOptionsDefaultError } from 'src/types/global';
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

export function useSignup(
  options?: MutationOptionsDefaultError<OnlyOkResponseType, AuthSignupDto>
) {
  return useMutation({
    ...options,
    mutationFn: (data: AuthSignupDto) => PAppClient.auth.signup(data),
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (data: VerifyTokenDto) => PAppClient.auth.verifyEmail(data),
  });
}

export function useGoogleLogin(
  options?: MutationOptionsDefaultError<AccessTokenResponseType, GoogleSigninDto>
) {
  return useMutation({
    ...options,
    mutationFn: (data: GoogleSigninDto) => PAppClient.auth.googleLogin(data),
  });
}

export function usePasswordLogin(
  options?: MutationOptionsDefaultError<AccessTokenResponseType, PasswordLoginDto>
) {
  return useMutation({
    ...options,
    mutationFn: (data: PasswordLoginDto) => PAppClient.auth.signinWithPassword(data),
  });
}

export function useSendRecoverPassword() {
  return useMutation({
    mutationFn: (data: GoogleRecoverPasswordDto) => PAppClient.auth.sendRecoverMailPassword(data),
  });
}

export function useRecoverPassword() {
  return useMutation({
    mutationFn: (data: RecoverTokenDto) => PAppClient.auth.recoverPassword(data),
  });
}
