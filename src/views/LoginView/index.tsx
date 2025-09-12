'use client';

import { toast } from 'sonner';
import CommonContainer from 'src/components/box/CommonContainer';
import BaseInput from 'src/components/input/BaseInput';
import { Button } from 'src/components/shadcn-ui/button';
import wordClient from 'src/services/api-query/wordClient';

export default function LoginView() {
  async function onOAuthClick() {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const { error } = await wordClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${baseUrl}/word`,
      },
    });
    if (error) toast.error(error.message);
  }

  return (
    <CommonContainer className="bg-sidebar-accent mt-4 !max-w-lg rounded-xl shadow-2xl">
      <form>
        <BaseInput placeholder="Email" />
        <BaseInput placeholder="Password" />
        <Button type="submit" className="w-full">
          Login
        </Button>
        <p className="my-3 text-center text-lg font-semibold">Or</p>
        <Button
          type="button"
          onClick={onOAuthClick}
          className="bg-destructive hover:bg-destructive/50 w-full"
        >
          Login with Google
        </Button>
      </form>
    </CommonContainer>
  );
}
