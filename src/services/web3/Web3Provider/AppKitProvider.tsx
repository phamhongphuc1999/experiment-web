'use client';

import { ReactNode } from 'react';
import { ChainId } from 'src/global';
import { WagmiProvider, type Config } from 'wagmi';
import { wagmiAdapter } from '../Adapter/AppWagmiAdapter';

interface Props {
  chainId: ChainId;
  children: ReactNode;
}

export default function AppKitProvider({ chainId, children }: Props) {
  const isEvm = chainId === ChainId.BSC || chainId === ChainId.BASE;

  if (isEvm)
    return <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>{children}</WagmiProvider>;
  return <>{children}</>;
}
