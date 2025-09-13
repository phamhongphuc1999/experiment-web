import { createClient, PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';
import { SUPBASE_API_KEY, SUPBASE_API_URL } from 'src/configs/constance';
import {
  CategoryParamsType,
  CategoryTableType,
  DatabaseType,
  PairTableType,
  TypedSupabaseClient,
} from 'src/global';
import { getPaginationRange } from '..';

const wordClient: TypedSupabaseClient = createClient<DatabaseType>(
  SUPBASE_API_URL,
  SUPBASE_API_KEY,
  { auth: { autoRefreshToken: false } }
);

export default wordClient;

export const wordClientApi = {
  async getCategory(params: CategoryParamsType = {}) {
    const { filter } = params;
    const sortBy = filter?.sortBy || 'update_at';
    let query = wordClient.from('category').select('*', { count: 'exact' });
    if (filter?.title) query = query.ilike('title', `%${filter.title}%`);

    const ascending = filter?.sortOrder == 'ascending' ? true : false;
    query = query.order(sortBy, { ascending });

    const { from, to } = getPaginationRange(params.pagination);
    query = query.range(from, to);
    const results = await query;
    return results as PostgrestResponse<CategoryTableType>;
  },
  async getCategoryById(id: string) {
    const result = await wordClient.from('category').select('*').eq('id', id).single();
    return result as PostgrestSingleResponse<CategoryTableType>;
  },
  async getPairsByCategoryId(categoryId: string) {
    const result = await wordClient.from('pair').select('*').eq('category_id', categoryId);
    return result as PostgrestResponse<PairTableType>;
  },
  async insertNewPair(newPairs: Array<Omit<PairTableType, 'id'>>) {
    await wordClient.from('pair').insert(newPairs as never);
  },
};
