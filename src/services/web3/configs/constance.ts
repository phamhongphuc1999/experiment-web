import { ChainNamespace } from '@reown/appkit/networks';
import { ChainId } from 'src/global';

export const REOWN_PROJECT_ID = process.env.NEXT_REOWN_PROJECT_ID || '';

export const namespaceByChainId: { [k: string]: ChainNamespace } = {
  [ChainId.BSC]: 'eip155',
  [ChainId.BASE]: 'eip155',
  [ChainId.SOL]: 'solana',
};
