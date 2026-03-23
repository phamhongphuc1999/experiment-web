'use client';

import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAuthStore } from 'src/states/auth.state';

export default function useAuthQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
>(props: UseQueryOptions<TQueryFnData, TError, TData, QueryKey>) {
  const { isReady, accessToken } = useAuthStore();

  return useQuery({
    ...props,
    queryKey: [...(props.queryKey as QueryKey), accessToken, isReady],
    enabled: (props.enabled ?? true) && isReady && Boolean(accessToken),
  });
}
