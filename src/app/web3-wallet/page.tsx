import CommonContainer from 'src/components/box/CommonContainer';
import { generateAppMetadata } from 'src/services';
import Web3WalletView from 'src/views/Web3WalletView';

export async function generateMetadata() {
  return generateAppMetadata('Web3 Wallet');
}

export default function Web3Wallet() {
  return (
    <CommonContainer>
      <Web3WalletView />
    </CommonContainer>
  );
}
