'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import wordApi from 'src/services/api-query/word.api';

export default function WordView() {
  const router = useRouter();

  useEffect(() => {
    wordApi.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace('/word');
      else router.push('/login');
    });
  }, [router]);

  return <>123</>;
}
