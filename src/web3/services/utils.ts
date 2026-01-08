import { REOWN_PROJECT_ID, SolanaNetworkConfig } from '../configs/constance';
import { Cluster } from '@solana/web3.js';

export function getSolanaRpc(cluster: Cluster) {
  const _key = SolanaNetworkConfig[cluster];
  const rpcUrl = `https://rpc.walletconnect.org/v1/?chainId=${_key}&projectId=${REOWN_PROJECT_ID}`;
  return rpcUrl;
}
