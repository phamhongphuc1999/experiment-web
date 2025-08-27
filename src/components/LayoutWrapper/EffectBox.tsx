'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import { LS } from 'src/configs/constance';
import { LocalStorage } from 'src/services';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false, refetchOnMount: false },
  },
});

interface Props {
  children: ReactNode;
}

export default function EffectBox({ children }: Props) {
  useEffect(() => {
    const theme = LocalStorage.get(LS.THEME) || 'dark';
    LocalStorage.set(LS.THEME, theme);
    document.body.dataset.theme = theme;
    if (theme == 'dark') document.documentElement.classList.toggle('dark');
    else document.documentElement.classList.remove('dark');
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
