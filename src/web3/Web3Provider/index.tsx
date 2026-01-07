'use client';

import { AppKitNetwork, solana } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';
import { lazy, ReactNode } from 'react';
import { useWeb3Store } from 'src/web3/states/web3.state';
import { solanaAdapter } from '../Adapter/AppSolanaAdapter';
import { evmNetworks, wagmiAdapter } from '../Adapter/AppWagmiAdapter';
import { REOWN_PROJECT_ID } from '../configs/constance';
import Web3WalletProvider from '../context/web3-wallet.context';
import { ChainId } from '../types';

const AppKitProvider = lazy(() => import('./AppKitProvider'));

export const appKitNetworks = [...evmNetworks, solana] as unknown as [
  AppKitNetwork,
  ...AppKitNetwork[],
];

const metadata = { name: 'Experiment App', description: '', url: '', icons: [] };

export const appKit = createAppKit({
  adapters: [wagmiAdapter, solanaAdapter],
  projectId: REOWN_PROJECT_ID,
  networks: appKitNetworks,
  metadata,
  allowUnsupportedChain: false,
  enableNetworkSwitch: false,
  enableReconnect: true,
  debug: true,
  features: {
    analytics: true,
  },
  enableCoinbase: false,
});

interface Props {
  chainId: ChainId;
  children: ReactNode;
}

function Web3ProviderLayout({ chainId, children }: Props) {
  if (chainId === ChainId.SOL || chainId === ChainId.BSC || chainId === ChainId.BASE) {
    return <AppKitProvider>{children}</AppKitProvider>;
  }

  return <>{children}</>;
}

export default function Web3Provider({ children }: { children: ReactNode }) {
  const { chainId } = useWeb3Store();

  return (
    <Web3ProviderLayout chainId={chainId}>
      <Web3WalletProvider>{children}</Web3WalletProvider>
    </Web3ProviderLayout>
  );
}
