import { useWeb3WalletContext } from 'src/web3/context/web3-wallet.context';
import { useBalance } from 'wagmi';

export default function useEvmBalance() {
  const { address } = useWeb3WalletContext();

  return useBalance({ address: address as `0x${string}` | undefined });
}
