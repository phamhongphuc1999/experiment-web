/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { PairTableType } from 'src/global';
import { wordClientApi } from 'src/services/api-query/wordClient';

export function useNewPairs(
  options?: UseMutationOptions<any, Error, Array<Omit<PairTableType, 'id'>>>
) {
  return useMutation({
    mutationFn: wordClientApi.insertNewPair,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
    },
  });
}
