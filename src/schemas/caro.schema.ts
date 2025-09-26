import { number, object } from 'zod';

export const CaroConfigSchema = object({
  numberOfRows: number().min(5).max(30).optional(),
  numberOfColumns: number().min(5).max(30).optional(),
});
