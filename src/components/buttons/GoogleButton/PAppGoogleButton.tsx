import { CredentialResponse } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useGoogleLogin } from 'src/queries/papp/auth.query';
import GoogleButton from '.';
import { useAuthStore } from 'src/states/auth.state';

interface Props {
  className?: string;
}

export default function PAppGoogleButton({ className }: Props) {
  const router = useRouter();
  const { fn } = useAuthStore();
  const googleMutation = useGoogleLogin({
    onSuccess: (data) => {
      fn.setAccessToken(data.accessToken);
      router.push('/papp');
    },
  });

  async function googleLogin(credentialResponse: CredentialResponse) {
    if (credentialResponse.credential) {
      googleMutation.mutate({ idToken: credentialResponse.credential });
    } else toast.error('Signin fail!');
  }

  return (
    <GoogleButton
      className={className}
      isLoading={googleMutation.isPending}
      onOauthClick={googleLogin}
    />
  );
}
