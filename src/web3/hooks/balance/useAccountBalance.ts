import { useQuery } from '@tanstack/react-query';
import { OptionalQueryType } from 'src/types/global';
import { useWeb3WalletContext } from 'src/web3/context/web3-wallet.context';
import BalanceService, { BalanceOptionType } from 'src/web3/services/BalanceService';
import { useWeb3Store } from 'src/web3/states/web3.state';

type ParamsType = Partial<{
  query: OptionalQueryType<string | number | undefined>;
  params: BalanceOptionType;
}>;

export default function useAccountBalance(params: ParamsType = {}) {
  const { address } = useWeb3WalletContext();
  const { chainId } = useWeb3Store();

  return useQuery({
    enabled: Boolean(address),
    ...params.query,
    queryKey: ['useAccountBalance', address, chainId, params.params],
    queryFn: () => BalanceService.balance(address || '', chainId, params.params),
  });
}
