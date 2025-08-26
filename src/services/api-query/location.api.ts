import { LocationApiType } from 'src/global';
import ApiQuery from '.';

export const geographyApi = new ApiQuery('https://geocoding-api.open-meteo.com/v1');

export default class LocationApi {
  static async getLocation(name: string) {
    const res = await geographyApi.get<LocationApiType>('/search', { params: { name } });
    return res;
  }
}
