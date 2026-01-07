'use client';

import { AppKitConnectButton } from '@reown/appkit/react';
import TitleBox from 'src/components/box/TitleBox';
import { Button } from 'src/components/shadcn-ui/button';
import { useWeb3WalletContext } from 'src/services/web3/context/web3-wallet.context';
import Web3Provider from 'src/services/web3/Web3Provider';

function Web3WalletViewLayout() {
  const {
    address,
    fn: { connectWallet },
  } = useWeb3WalletContext();

  return (
    <>
      <p>Default buttons providing by reown</p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <AppKitConnectButton className="bg-secondary text-secondary-foreground flex cursor-pointer items-center rounded-xl">
          Connect button
        </AppKitConnectButton>
      </div>
      <p>Custom buttons</p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Button onClick={connectWallet}>Connect button</Button>
      </div>
      <p>Information</p>
      <div>
        <TitleBox title="address" value={address} />
      </div>
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
