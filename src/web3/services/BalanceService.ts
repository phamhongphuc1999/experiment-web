import { Cluster, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { getBalance } from '@wagmi/core';
import { formatEther } from 'viem';
import { wagmiAdapter } from '../Adapter/AppWagmiAdapter';
import { AppNetworkConfig } from '../configs/constance';
import { ChainId } from '../types';
import { getSolanaRpc } from './utils';

export type BalanceOptionType = Partial<{ cluster: Cluster }>;

export default class BalanceService {
  static async getSolanaBalance(address: string, cluster: Cluster = 'mainnet-beta') {
    const rpcUrl = getSolanaRpc(cluster);
    const connection = new Connection(rpcUrl, 'confirmed');
    const pubKey = new PublicKey(address);
    const lamports = await connection.getBalance(pubKey);
    return lamports / LAMPORTS_PER_SOL;
  }
  static async getEvmBalance(address: `0x${string}`, chainId?: number) {
    const result = await getBalance(wagmiAdapter.wagmiConfig, { address, chainId });
    return formatEther(result.value);
  }
  static async balance(
    address: string,
    chainId: ChainId,
    options: BalanceOptionType | undefined = undefined
  ) {
    if (chainId == ChainId.BSC || chainId == ChainId.BASE) {
      const chain = AppNetworkConfig[chainId];
      return this.getEvmBalance(address as `0x${string}`, chain.chain.chainIntegerId);
    } else if (chainId == ChainId.SOL) return this.getSolanaBalance(address, options?.cluster);
    else return undefined;
  }
}
