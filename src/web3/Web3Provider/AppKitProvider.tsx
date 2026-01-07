'use client';

import { ReactNode } from 'react';
import { WagmiProvider, type Config } from 'wagmi';
import { wagmiAdapter } from '../Adapter/AppWagmiAdapter';

interface Props {
  children: ReactNode;
}

export default function AppKitProvider({ children }: Props) {
  return <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>{children}</WagmiProvider>;
}
