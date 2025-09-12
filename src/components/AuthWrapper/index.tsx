'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';
import wordClient from 'src/services/api-query/wordClient';

export default function AuthWrapper({ children }: PropsWithChildren) {
  const router = useRouter();

  useEffect(() => {
    wordClient.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/login');
    });
  }, [router]);

  return <>{children}</>;
}
