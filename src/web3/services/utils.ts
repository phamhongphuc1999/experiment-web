import { REOWN_PROJECT_ID, SolanaNetworkConfig } from '../configs/constance';
import { Cluster } from '@solana/web3.js';

export function getSolanaRpc(cluster: Cluster) {
  const _key = SolanaNetworkConfig[cluster];
  const rpcUrl =
    cluster == 'mainnet-beta'
      ? 'https://api.mainnet-beta.solana.com'
      : `https://rpc.walletconnect.org/v1/?chainId=${_key}&projectId=${REOWN_PROJECT_ID}`;
  return rpcUrl;
}
