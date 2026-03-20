'use client';

import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { ComponentProps } from 'react';
import { toast } from 'sonner';
import { cn } from 'src/lib/utils';
import { GoogleIcon } from '../icons';

interface Props extends ComponentProps<'div'> {
  isLoading?: boolean;
  onOauthClick?: (credentialResponse: CredentialResponse) => void;
}

export default function GoogleButton(props: Props) {
  return (
    <div {...props} className={cn('relative', props.className)}>
      <button
        disabled={props.isLoading}
        className="border-muted text-foreground pointer-events-none box-border flex h-9 w-full cursor-pointer items-center justify-center gap-1 overflow-hidden rounded-lg border-[0.3px] border-solid bg-white/4 px-3 py-2 text-base leading-[100%] font-semibold tracking-[-0.01em] shadow-[0px_4px_12px_rgba(0,0,0,0.25)] transition-colors hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <GoogleIcon className="h-5 w-5 shrink-0" />
        <span>{props.isLoading ? 'Signing in...' : 'Continue with Google'}</span>
      </button>
      {!props.isLoading && (
        <div className="absolute inset-0 z-10 h-full w-full opacity-0">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              if (credentialResponse.credential) {
                try {
                  props?.onOauthClick?.(credentialResponse);
                  toast.success('Welcome back!', {
                    description: 'You have successfully signed in.',
                  });
                } catch (error) {
                  console.error('Login failed:', error);
                  toast.error('Login failed', { description: 'Please try again.' });
                }
              }
            }}
            onError={() => {
              console.error('Google Sign-In Error');
              toast.error('Google Sign-In failed', { description: 'Please try again.' });
            }}
            useOneTap
          />
        </div>
      )}
    </div>
  );
}
