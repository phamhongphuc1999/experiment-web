'use client';

import { ReactNode } from 'react';
import { WagmiProvider, type Config } from 'wagmi';
import { wagmiAdapter } from '../Adapter/AppWagmiAdapter';

type TProps = {
  children: ReactNode;
};

export default function AppKitProvider({ children }: TProps) {
  return <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>{children}</WagmiProvider>;
}
