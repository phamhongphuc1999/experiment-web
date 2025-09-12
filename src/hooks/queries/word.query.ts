import { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QUERY_KEY } from 'src/configs/constance';
import { CategoryTableType, OptionalQueryType, PairTableType } from 'src/global';
import { wordClientApi } from 'src/services/api-query/wordClient';

export function useCategories(query?: OptionalQueryType) {
  const result = useQuery({
    ...query,
    queryKey: [QUERY_KEY.wordCategory],
    queryFn: wordClientApi.getCategory,
  });
  return result as UseQueryResult<PostgrestResponse<CategoryTableType>>;
}

export function useCategoryById(id: string, query?: OptionalQueryType) {
  const result = useQuery({
    ...query,
    queryKey: [QUERY_KEY.wordCategoryById, id],
    queryFn: () => wordClientApi.getCategoryById(id),
    enabled: Boolean(id),
  });
  return result as UseQueryResult<PostgrestSingleResponse<CategoryTableType>>;
}

export function usePairByCategoryId(categoryId: string, query?: OptionalQueryType) {
  const result = useQuery({
    ...query,
    queryKey: [QUERY_KEY.wordPairByCategoryById, categoryId],
    queryFn: () => wordClientApi.getPairsByCategoryId(categoryId),
    enabled: Boolean(categoryId),
  });
  return result as UseQueryResult<PostgrestResponse<PairTableType>>;
}
