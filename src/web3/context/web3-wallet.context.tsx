'use client';

import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { appKitNetworkByChainId, namespaceByChainId } from '../configs/constance';
import useReownWalletByNamespace from '../hooks/useReownWalletByNamespace';
import { useWeb3Store } from '../states/web3.state';
import { ChainId } from '../types';

export type Web3WalletContextType = {
  address: string | undefined;
  isConnected: boolean;
  fn: {
    connectWallet: () => Promise<void | { hash: string } | undefined>;
    disconnectWallet: () => Promise<void>;
    switchNetwork: (newChainId: ChainId, isSaveLocalStorage?: boolean) => Promise<void>;
  };
};

const web3WalletContextDefault: Web3WalletContextType = {
  address: undefined,
  isConnected: false,
  fn: {
    connectWallet: async () => {},
    disconnectWallet: async () => {},
    switchNetwork: async () => {},
  },
};

const Web3WalletContext = createContext<Web3WalletContextType>(web3WalletContextDefault);

interface Props {
  children: ReactNode;
}

export default function Web3WalletProvider({ children }: Props) {
  const {
    chainId,
    fn: { setChainId },
  } = useWeb3Store();
  const { address, isConnected, connectWallet, disconnectWallet } = useReownWalletByNamespace({
    chainId,
  });

  const { isConnected: isEVMConnected } = useAppKitAccount({ namespace: 'eip155' });
  const { isConnected: isSolanaConnected } = useAppKitAccount({ namespace: 'solana' });

  const { switchNetwork } = useAppKitNetwork();

  const _switchNetwork = useCallback(
    async (newChainId: ChainId, isSaveLocalStorage = true) => {
      try {
        const targetNamespace = namespaceByChainId[newChainId];
        const isSupported = targetNamespace === 'eip155' ? isEVMConnected : isSolanaConnected;

        if (isConnected && !isSupported) {
          toast.warning(
            `Current wallet may not support ${newChainId}. Please connect a compatible wallet.`
          );
          return;
        }

        if (appKitNetworkByChainId[newChainId]) {
          await switchNetwork(appKitNetworkByChainId[newChainId]);
        }
        if (isSaveLocalStorage) setChainId(newChainId);
      } catch (error) {
        toast.error(String(error));
      }
    },
    [switchNetwork, setChainId, isConnected, isEVMConnected, isSolanaConnected]
  );

  useEffect(() => {
    _switchNetwork(chainId, false);
  }, [_switchNetwork, chainId]);

  const contextData = useMemo(() => {
    return {
      address,
      isConnected,
      fn: { connectWallet, disconnectWallet, switchNetwork: _switchNetwork },
    };
  }, [address, connectWallet, disconnectWallet, isConnected, _switchNetwork]);

  return <Web3WalletContext.Provider value={contextData}>{children}</Web3WalletContext.Provider>;
}

export function useWeb3WalletContext() {
  return useContext(Web3WalletContext);
}
