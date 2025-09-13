import { object, string } from 'yup';

export const AddWordSchema = object({
  en: string().required().min(1),
  vi: string().required().min(1),
});
