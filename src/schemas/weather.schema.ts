import { number, object } from 'zod';

export const WeatherParamsSchema = object({
  latitude: number(),
  longitude: number(),
});
