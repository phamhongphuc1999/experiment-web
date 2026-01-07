'use client';

import { createContext, ReactNode, useContext, useMemo } from 'react';
import useReownWalletByNamespace from '../hooks/useReownWalletByNamespace';
import { useWeb3Store } from '../states/web3.state';

export type Web3WalletContextType = {
  address: string | undefined;
  isConnected: boolean;
  fn: {
    connectWallet: () => Promise<void | { hash: string } | undefined>;
    disconnectWallet: () => Promise<void>;
  };
};

const web3WalletContextDefault: Web3WalletContextType = {
  address: undefined,
  isConnected: false,
  fn: { connectWallet: async () => {}, disconnectWallet: async () => {} },
};

const Web3WalletContext = createContext<Web3WalletContextType>(web3WalletContextDefault);

interface Props {
  children: ReactNode;
}

export default function Web3WalletProvider({ children }: Props) {
  const { chainId } = useWeb3Store();
  const { address, isConnected, connectWallet, disconnectWallet } = useReownWalletByNamespace({
    chainId,
  });

  const contextData = useMemo(() => {
    return { address, isConnected, fn: { connectWallet, disconnectWallet } };
  }, [address, connectWallet, disconnectWallet, isConnected]);

  return <Web3WalletContext.Provider value={contextData}>{children}</Web3WalletContext.Provider>;
}

export function useWeb3WalletContext() {
  return useContext(Web3WalletContext);
}
