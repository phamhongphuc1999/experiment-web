/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { OptionalQueryType } from 'src/types/global';
import { getSolanaRpc } from 'src/web3/services/utils';
import { ContractActionParams } from 'src/web3/types';

export default function useSolanaReadContract() {
  const readContract = useCallback(async (params: ContractActionParams) => {
    const { address, functionName, args = [], idl, cluster = 'mainnet-beta' } = params;

    const rpcUrl = getSolanaRpc(cluster);
    const connection = new Connection(rpcUrl, 'confirmed');

    if (idl) {
      const provider = new AnchorProvider(connection, {} as any, {
        commitment: 'confirmed',
      });
      const program = new Program(idl, provider);
      const accountNamespace = program.account as Record<
        string,
        { fetch: (pubkey: PublicKey) => Promise<any> }
      >;
      if (accountNamespace[functionName]) {
        return await accountNamespace[functionName].fetch(new PublicKey(address));
      }

      const methodNamespace = program.methods as Record<
        string,
        (...args: any[]) => { view: () => Promise<any> }
      >;

      if (methodNamespace[functionName]) {
        return await methodNamespace[functionName](...args).view();
      }

      throw new Error(`Method or Account "${functionName}" not found in IDL`);
    } else {
      const accountInfo = await connection.getAccountInfo(new PublicKey(address));
      return accountInfo;
    }
  }, []);

  return { readContract };
}

type QueryType = {
  contractParams: ContractActionParams;
  queryParams?: OptionalQueryType<unknown>;
};

export function useQuerySolanaReadContract({ contractParams, queryParams }: QueryType) {
  const { readContract } = useSolanaReadContract();

  return useQuery({
    ...queryParams,
    queryKey: ['useQuerySolanaReadContract', contractParams],
    queryFn: () => readContract(contractParams),
  });
}
