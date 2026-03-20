import { CredentialResponse } from '@react-oauth/google';
import { toast } from 'sonner';
import { useGoogleLogin } from 'src/queries/papp/auth.query';
import GoogleButton from './GoogleButton';
import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
}

export default function PAppGoogleButton({ className }: Props) {
  const router = useRouter();
  const googleMutation = useGoogleLogin({
    onSuccess: () => {
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
