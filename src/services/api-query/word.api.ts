import { createClient } from '@supabase/supabase-js';
import { SUPBASE_API_KEY, SUPBASE_API_URL } from 'src/configs/constance';

const wordApi = createClient(SUPBASE_API_URL, SUPBASE_API_KEY);

export default wordApi;
