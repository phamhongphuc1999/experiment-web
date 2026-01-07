import { useAppKitNetwork } from '@reown/appkit/react';
import TitleBox from 'src/components/box/TitleBox';
import { useWeb3WalletContext } from 'src/web3/context/web3-wallet.context';
import useAccountBalance from 'src/web3/hooks/balance/useAccountBalance';

export default function Information() {
  const { address } = useWeb3WalletContext();
  const { chainId } = useAppKitNetwork();
  const { data: balance } = useAccountBalance();

  return (
    <div>
      <p className="text-md font-bold">Information</p>
      <div>
        <TitleBox title="address" value={address} />
        <TitleBox title="chainId (using appkit hook)" value={chainId} />
        {balance && <TitleBox title="balance" value={balance} />}
      </div>
    </div>
  );
}
