import { createBrowserClient } from '@supabase/ssr';
import { PostgrestResponse } from '@supabase/supabase-js';
import { SUPBASE_API_KEY, SUPBASE_API_URL } from 'src/configs/constance';
import { CategoryTableType, DatabaseType, TypedSupabaseClient } from 'src/global';

const wordClient: TypedSupabaseClient = createBrowserClient<DatabaseType>(
  SUPBASE_API_URL,
  SUPBASE_API_KEY,
  { auth: { autoRefreshToken: false } }
);

export default wordClient;

export const wordClientApi = {
  async getCategory() {
    const results = await wordClient.from('category').select('*');
    return results as PostgrestResponse<CategoryTableType>;
  },
};
