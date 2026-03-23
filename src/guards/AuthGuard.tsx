'use client';

import { useRouter } from 'next/navigation';
import { ComponentProps, useEffect } from 'react';
import ClockLoader from 'src/components/ClockLoader';
import { useAuthStore } from 'src/states/auth.state';

export default function AuthGuard(props: ComponentProps<'div'>) {
  const router = useRouter();
  const { accessToken, isReady } = useAuthStore();

  useEffect(() => {
    if (!accessToken && isReady) router.push('/papp/login');
  }, [accessToken, router, isReady]);

  if (accessToken && isReady) return <div {...props}>{props.children}</div>;

  return (
    <div {...props}>
      <ClockLoader />
    </div>
  );
}
