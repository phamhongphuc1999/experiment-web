'use client';

import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { base, bsc } from '@reown/appkit/networks';
import { REOWN_PROJECT_ID } from '../configs/constance';

export const evmNetworks = [bsc, base];

export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId: REOWN_PROJECT_ID,
  networks: evmNetworks,
});
