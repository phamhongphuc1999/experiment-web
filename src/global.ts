import { UseQueryOptions } from '@tanstack/react-query';

export type OptionalQueryType<T = unknown> = Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;

export type JsonType =
  | string
  | number
  | Array<string>
  | Array<number>
  | { [index: string | number]: JsonType };

export type PageMetadataType = Partial<{
  title: string;
  description: string;
  url: string;
  siteName: string;
  twitterHandle: string;
  icon: string;
  image: string;
  keywords: string;
}>;

// location type
export type LocationType = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  timezone: string;
  population: number;
  country_id: number;
  country: string;
  admin1: string;
  admin2?: string;
  admin3?: string;
};

export type LocationApiType = {
  results: Array<LocationType>;
  generationtime_ms: number;
};
// end location type

// weather type
export type WeatherHourlyVariableType =
  | 'temperature_2m'
  | 'relative_humidity_2m'
  | 'dew_point_2m'
  | 'apparent_temperature'
  | 'pressure_msl'
  | 'surface_pressure'
  | 'cloud_cover'
  | 'cloud_cover_low'
  | 'cloud_cover_mid'
  | 'cloud_cover_high'
  | 'wind_speed_10m'
  | 'wind_speed_80m'
  | 'wind_speed_120m'
  | 'wind_speed_180m'
  | 'wind_direction_10m'
  | 'wind_direction_80m'
  | 'wind_direction_120m'
  | 'wind_direction_180m'
  | 'wind_gusts_10m'
  | 'shortwave_radiation'
  | 'direct_radiation'
  | 'direct_normal_irradiance'
  | 'diffuse_radiation'
  | 'global_tilted_irradiance'
  | 'vapour_pressure_deficit'
  | 'cape'
  | 'evapotranspiration'
  | 'et0_fao_evapotranspiration'
  | 'precipitation'
  | 'snowfall'
  | 'precipitation_probability'
  | 'rain'
  | 'showers'
  | 'snow_depth'
  | 'weather_code'
  | 'freezing_level_height'
  | 'visibility'
  | 'soil_temperature_0cm'
  | 'soil_temperature_6cm'
  | 'soil_temperature_18cm'
  | 'soil_temperature_54cm'
  | 'soil_moisture_0_to_1cm'
  | 'soil_moisture_1_to_3cm'
  | 'soil_moisture_3_to_9cm'
  | 'soil_moisture_9_to_27cm'
  | 'soil_moisture_27_to_81cm'
  | 'is_day';

export type WeatherMinutely15mVariableType =
  | 'temperature_2m'
  | 'relative_humidity_2m'
  | 'dew_point_2m'
  | 'apparent_temperature'
  | 'shortwave_radiation'
  | 'direct_radiation'
  | 'direct_normal_irradiance'
  | 'global_tilted_irradiance'
  | 'global_tilted_irradiance_instant'
  | 'diffuse_radiation'
  | 'sunshine_duration'
  | 'lightning_potential'
  | 'precipitation'
  | 'snowfall'
  | 'rain'
  | 'showers'
  | 'snowfall_height'
  | 'freezing_level_height'
  | 'cape'
  | 'wind_speed_10m'
  | 'wind_speed_80m'
  | 'wind_direction_10m'
  | 'wind_direction_80m'
  | 'wind_gusts_10m'
  | 'visibility'
  | 'weather_code';

export type WeatherDailyVariableType =
  | 'temperature_2m_max'
  | 'temperature_2m_mean'
  | 'temperature_2m_min'
  | 'apparent_temperature_max'
  | 'apparent_temperature_mean'
  | 'apparent_temperature_min'
  | 'precipitation_sum'
  | 'rain_sum'
  | 'showers_sum'
  | 'snowfall_sum'
  | 'precipitation_hours'
  | 'precipitation_probability_max'
  | 'precipitation_probability_mean'
  | 'precipitation_probability_min'
  | 'weather_code'
  | 'sunrise'
  | 'sunset'
  | 'sunshine_duration'
  | 'daylight_duration'
  | 'wind_speed_10m_max'
  | 'wind_gusts_10m_max'
  | 'wind_direction_10m_dominant'
  | 'shortwave_radiation_sum'
  | 'et0_fao_evapotranspiration'
  | 'uv_index_max'
  | 'uv_index_clear_sky_max';

export type WeatherParamsType = {
  latitude: number;
  longitude: number;
  elevation?: number | number[];
  hourly?: Array<WeatherHourlyVariableType>;
  daily?: Array<WeatherDailyVariableType>;
  current?: string | string[];
  temperature_unit?: 'celsius' | 'fahrenheit';
  wind_speed_unit?: 'kmh' | 'ms' | 'mph' | 'kn';
  precipitation_unit?: 'mm' | 'inch';
  timeformat?: 'iso8601' | 'unixtime';
  timezone?: string;
  past_days?: number;
  forecast_days?: number;
  forecast_hours?: number;
  forecast_minutely_15?: number;
  past_hours?: number;
  past_minutely_15?: number;
  start_date?: string;
  end_date?: string;
  start_hour?: string;
  end_hour?: string;
  start_minutely_15?: string;
  end_minutely_15?: string;
  models?: string | string[];
  cell_selection?: 'land' | 'sea' | 'nearest';
  apikey?: string;
};

export type WeatherApiType = {
  elevation: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
};
// end weather type
