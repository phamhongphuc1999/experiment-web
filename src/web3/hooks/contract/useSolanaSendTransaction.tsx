import { useAppKitProvider } from '@reown/appkit/react';
import { Connection, PublicKey } from '@solana/web3.js';
import { useCallback } from 'react';
import { getSolanaRpc } from 'src/web3/services/utils';
import { SolanaSendTransactionType } from 'src/web3/types';
import { type Provider as SolProvider } from '@reown/appkit-adapter-solana/react';

export default function useSolanaSendTransaction() {
  const { walletProvider: walletSolProvider } = useAppKitProvider<SolProvider>('solana');

  const sendTransaction = useCallback(
    async (props: SolanaSendTransactionType) => {
      if (!walletSolProvider) throw new Error('Wallet provider not available');
      const { transaction, address, cluster = 'mainnet-beta' } = props;
      const rpcUrl = getSolanaRpc(cluster);
      const connection = new Connection(rpcUrl, 'confirmed');
      const sender = new PublicKey(address);

      const latest = await connection.getLatestBlockhash('confirmed');
      transaction.recentBlockhash = latest.blockhash;
      transaction.feePayer = sender;

      const signedTx = await walletSolProvider.signTransaction(transaction);
      const sig = await connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: false,
      });
      await connection.confirmTransaction(
        {
          signature: sig,
          blockhash: latest.blockhash,
          lastValidBlockHeight: latest.lastValidBlockHeight,
        },
        'confirmed'
      );
      return sig;
    },
    [walletSolProvider]
  );

  return { sendTransaction };
}
