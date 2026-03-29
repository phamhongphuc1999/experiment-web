'use client';

import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { ComponentProps, useEffect } from 'react';
import ClockLoader from 'src/components/ClockLoader';
import { useAuthStore } from 'src/states/auth.state';

type JwtPayload = {
  exp: number;
  iat: number;
  sub: number;
};

export default function AuthGuard(props: ComponentProps<'div'>) {
  const router = useRouter();
  const { accessToken, isReady, fn } = useAuthStore();

  useEffect(() => {
    if (isReady) {
      if (!accessToken) router.push('/papp/login');
      else {
        const decoded = jwtDecode<JwtPayload>(accessToken);
        if (dayjs().isAfter(dayjs.unix(decoded.exp))) {
          fn.clearAccessToken();
          router.push('/papp/login');
        }
      }
    }
  }, [accessToken, router, isReady, fn]);

  if (accessToken && isReady) return <>{props.children}</>;

  return <ClockLoader />;
}
