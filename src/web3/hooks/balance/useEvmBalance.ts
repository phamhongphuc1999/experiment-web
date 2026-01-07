import { useBalance } from 'wagmi';
import { useWeb3WalletContext } from '../../context/web3-wallet.context';

export default function useEvmBalance() {
  const { address } = useWeb3WalletContext();

  return useBalance({ address: address as `0x${string}` | undefined });
}
