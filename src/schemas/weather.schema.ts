import { number, object } from 'yup';

export const WeatherParamsSchema = object({
  latitude: number().required(),
  longitude: number().required(),
});
