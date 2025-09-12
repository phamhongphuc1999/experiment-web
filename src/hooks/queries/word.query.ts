import { PostgrestResponse } from '@supabase/supabase-js';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QUERY_KEY } from 'src/configs/constance';
import { CategoryTableType, OptionalQueryType } from 'src/global';
import { wordClientApi } from 'src/services/api-query/wordClient';

export function useCategories(query?: OptionalQueryType) {
  const result = useQuery({
    ...query,
    queryKey: [QUERY_KEY.wordCategory],
    queryFn: wordClientApi.getCategory,
  });
  return result as UseQueryResult<PostgrestResponse<CategoryTableType>>;
}
