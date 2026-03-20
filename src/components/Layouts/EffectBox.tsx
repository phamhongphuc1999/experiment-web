'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import { useConfigStore } from 'src/states/config.state';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false, refetchOnMount: false },
  },
});

interface Props {
  children: ReactNode;
}

export default function EffectBox({ children }: Props) {
  const { theme } = useConfigStore();

  useEffect(() => {
    document.body.dataset.theme = theme;
    if (theme == 'dark') document.documentElement.classList.toggle('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
