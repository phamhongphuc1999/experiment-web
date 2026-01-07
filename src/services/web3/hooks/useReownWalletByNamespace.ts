import { useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react';
import { ChainId } from 'src/global';
import { namespaceByChainId } from '../configs/constance';

type Props = {
  chainId: ChainId;
};

export default function useReownWalletByNamespace({ chainId }: Props) {
  const namespace = namespaceByChainId[chainId];
  const { address, isConnected } = useAppKitAccount({ namespace });
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();

  return {
    address,
    isConnected,
    connectWallet: async () => await open({ namespace }),
    disconnectWallet: async () => disconnect({ namespace }),
  };
}
