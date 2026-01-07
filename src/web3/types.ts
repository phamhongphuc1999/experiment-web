/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cluster, Transaction } from '@solana/web3.js';

export enum ChainId {
  SOL = 'solana',
  APT = 'aptos',
  BSC = 'bsc',
  SUI = 'sui',
  BASE = 'base',
}

export type ContractActionParams = {
  address: string; // Contract or Program ID
  functionName: string; // Method name
  args: any[]; // Arguments for the call
  abi?: any; // Required for EVM
  idl?: any; // Highly recommended for Solana (Anchor)
  cluster?: Cluster; // used by Solana
};

export type NetworkConfig = {
  chain: {
    chainIntegerId?: number;
    chainId: ChainId;
  };
};

export type SolanaSendTransactionType = {
  transaction: Transaction;
  address: string;
  cluster?: Cluster;
};
