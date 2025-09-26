import { object, string } from 'zod';

export const AddWordSchema = object({
  en: string().min(1),
  vi: string().min(1),
});
