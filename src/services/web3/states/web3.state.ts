import { ChainId } from 'src/global';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface Web3StateType {
  chainId: ChainId;
  fn: {
    setChainId: (chainId: ChainId) => void;
  };
}

export const useWeb3Store = create<
  Web3StateType,
  [['zustand/persist', unknown], ['zustand/immer', unknown]]
>(
  persist(
    immer((set) => {
      return {
        chainId: ChainId.SOL,
        fn: {
          setChainId: (chainId) => {
            set((state) => {
              state.chainId = chainId;
            });
          },
        },
      };
    }),
    {
      name: 'experiment.web3',
      version: 1.0,
      migrate(persistedState, version) {
        if (version < 1.0) {
          return { ...(persistedState as Web3StateType) };
        }
        return persistedState;
      },
      partialize: (state) => {
        const { fn, ...rest } = state;
        return { ...rest };
      },
    }
  )
);
