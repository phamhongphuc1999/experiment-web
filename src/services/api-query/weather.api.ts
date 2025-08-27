import { WeatherApiType, WeatherParamsType } from 'src/global';
import ApiQuery from '.';

export const weatherMeteoApi = new ApiQuery('https://api.open-meteo.com/v1/forecast');

export default class WeatherApi {
  static async getWeather(params: WeatherParamsType) {
    const res = await weatherMeteoApi.get<WeatherApiType>('/', { params });
    return res;
  }
}
