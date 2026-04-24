import { Metadata } from 'next';
import { generateAppMetadata } from 'src/services';
import Web3WalletView from 'src/views/Web3WalletView';

export const metadata: Metadata = generateAppMetadata('Web3 Wallet');

export default function Web3Wallet() {
  return (
    <div className="container">
      <Web3WalletView />
    </div>
  );
}
