import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'src/configs/constance';
import { OptionalQueryType, WeatherApiType, WeatherParamsType } from 'src/global';
import { WeatherParamsSchema } from 'src/schemas/weather.schema';
import WeatherApi from 'src/services/api-query/weather.api';

export function useWeather(
  params: Partial<WeatherParamsType>,
  query?: OptionalQueryType<WeatherApiType>
) {
  return useQuery({
    enabled: WeatherParamsSchema.safeParse(params).success,
    ...query,
    queryKey: [QUERY_KEY.weather, params],
    queryFn: () => WeatherApi.getWeather(params as WeatherParamsType),
  });
}
