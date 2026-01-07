'use client';

import { AppKitAccountButton, AppKitConnectButton, AppKitNetworkButton } from '@reown/appkit/react';
import { Button } from 'src/components/shadcn-ui/button';
import { supportedNetworks } from 'src/web3/configs/constance';
import { useWeb3WalletContext } from 'src/web3/context/web3-wallet.context';
import { useWeb3Store } from 'src/web3/states/web3.state';
import Web3Provider from 'src/web3/Web3Provider';
import Information from './Information';

function Web3WalletViewLayout() {
  const {
    isConnected,
    fn: { connectWallet, disconnectWallet },
  } = useWeb3WalletContext();
  const { chainId, fn } = useWeb3Store();

  return (
    <>
      <p className="text-md font-bold">Default buttons providing by reown</p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {!isConnected && (
          <AppKitConnectButton className="bg-secondary text-secondary-foreground flex cursor-pointer items-center rounded-xl">
            Connect button
          </AppKitConnectButton>
        )}
        <AppKitAccountButton />
        <AppKitNetworkButton />
      </div>
      <div className="bg-secondary my-2 h-px" />
      <p className="text-md font-bold">Custom buttons</p>
      {isConnected ? (
        <Button onClick={disconnectWallet}>Disconnect</Button>
      ) : (
        <Button onClick={connectWallet}>Connect button</Button>
      )}
      <div className="mt-2 flex items-center gap-2">
        {supportedNetworks.map((network) => {
          return (
            <Button
              variant={chainId == network ? 'secondary' : 'outline'}
              onClick={() => fn.setChainId(network)}
            >
              {network}
            </Button>
          );
        })}
      </div>
      <div className="bg-secondary my-2 h-px" />
      <Information />
    </>
  );
}

export default function Web3WalletView() {
  return (
    <Web3Provider>
      <Web3WalletViewLayout />
    </Web3Provider>
  );
}
