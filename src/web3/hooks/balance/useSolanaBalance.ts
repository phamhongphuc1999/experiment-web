'use client';
import { useAppKitConnection } from '@reown/appkit-adapter-solana/react';
import { useAppKitAccount } from '@reown/appkit/react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';

export default function useSolanaBalance() {
  const { address, isConnected } = useAppKitAccount();
  const { connection } = useAppKitConnection();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (isConnected && address && connection) {
      connection.getBalance(new PublicKey(address)).then((b) => {
        setBalance(b / LAMPORTS_PER_SOL);
      });
    }
  }, [address, isConnected, connection]);

  return { balance };
}
