/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { baseQuery } from 'src/services/api-query';

export function useRandomNumber(options?: UseMutationOptions<any, Error>) {
  return useMutation({
    mutationFn: () => baseQuery.get('/random-user'),
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
    },
  });
}
