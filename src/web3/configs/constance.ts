import { AppKitNetwork, base, bsc, ChainNamespace, solana } from '@reown/appkit/networks';
import { Cluster } from '@solana/web3.js';
import { ChainId, NetworkConfig } from '../types';

export const REOWN_PROJECT_ID = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || '';
export const supportedNetworks = [ChainId.BSC, ChainId.BASE, ChainId.SOL, ChainId.APT, ChainId.SUI];

export const namespaceByChainId: { [k: string]: ChainNamespace } = {
  [ChainId.BSC]: 'eip155',
  [ChainId.BASE]: 'eip155',
  [ChainId.SOL]: 'solana',
};

export const appKitNetworkByChainId: { [k: string]: AppKitNetwork } = {
  [ChainId.BSC]: bsc,
  [ChainId.BASE]: base,
  [ChainId.SOL]: solana,
};

export const SolanaNetworkConfig: { [network in Cluster]: string } = {
  'mainnet-beta': 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
  devnet: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
  testnet: 'solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY',
};

export const AppNetworkConfig: { [chainId in ChainId]: NetworkConfig } = {
  [ChainId.BSC]: { chain: { chainIntegerId: 56, chainId: ChainId.BSC } },
  [ChainId.BASE]: { chain: { chainIntegerId: 8453, chainId: ChainId.BASE } },
  [ChainId.SOL]: { chain: { chainId: ChainId.SOL } },
  [ChainId.APT]: { chain: { chainId: ChainId.APT } },
  [ChainId.SUI]: { chain: { chainId: ChainId.SUI } },
};
