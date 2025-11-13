import { SupabaseClient } from '@supabase/supabase-js';
import { UseQueryOptions } from '@tanstack/react-query';
import { ComponentProps } from 'react';

export type ThemeType = 'light' | 'dark';

export interface AnimationComponentProps {
  size?: number | string;
  color?: string;
}

export interface AnimationComponentDivProps<T = AnimationComponentProps>
  extends ComponentProps<'div'> {
  iconProps?: T;
}

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
export type TemperatureUnitType = 'celsius' | 'fahrenheit';
export type WindSpeedUnitType = 'kmh' | 'ms' | 'mph' | 'kn';

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
  current?: string[];
  temperature_unit?: TemperatureUnitType;
  wind_speed_unit?: WindSpeedUnitType;
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
  hourly_units?: { time: string } & { [id in WeatherHourlyVariableType]: string };
  hourly?: { time: Array<string> } & { [id in WeatherDailyVariableType]: Array<number> };
};
// end weather type

// start word
export type WordModeType = 'noun' | 'adj' | 'adv' | 'verb';
export type SortOrderType = 'ascending' | 'descending';

export type BaseFilterType<T, SortByType = string> = Partial<
  T & {
    sortBy: SortByType;
    sortOrder: SortOrderType;
  }
>;

export type PaginationType = {
  page?: number;
  pageSize?: number;
};

export type BaseSupbaseQueryParamsType<T, SortByType = string> = {
  filter?: BaseFilterType<T, SortByType>;
  pagination?: PaginationType;
};

export type CategorySortByType = 'create_at' | 'update_at';

export type CategoryParamsType = BaseSupbaseQueryParamsType<{ title: string }, CategorySortByType>;

export type CategoryTableType = {
  id: string;
  title: string;
  user_id: string;
  create_at: string;
  update_at: string;
};

export type ResultType = {
  status: string;
  correct: number;
  errors: { [id: string]: boolean };
};

export type PairTableType = {
  id: string;
  en: string;
  vi: string;
  category_id: string;
  note?: string;
};

export type DatabaseType = {
  public: {
    Tables: {
      category: {
        Row: CategoryTableType;
        Insert: Omit<CategoryTableType, 'id' | 'create_at'>;
        Update: Pick<CategoryTableType, 'title'>;
      };
      pair: {
        Row: PairTableType;
        Insert: Omit<PairTableType, 'id'>;
        Update: Partial<Omit<PairTableType, 'id'>>;
      };
    };
  };
};

export type TypedSupabaseClient = SupabaseClient<DatabaseType>;

export type BaseSupbaseResponseType = {
  count: null;
  error: null;
  status: number;
  statusText: string;
};

export type SupbaseResponseType<T> = BaseSupbaseResponseType & { data: Array<T> };

export type SupbaseSingleResponseType<T> = BaseSupbaseResponseType & { data: T };
// end word

// start caro
export type TurnType = 0 | 1;
export type PositionType = [number, number]; //expect [row, column]
export type RoleType = 'host' | 'guest';
export type ConnectionType = 'init' | 'connecting' | 'connected';
export type PlayModeType = 'offline' | 'online' | 'machine';
export type CaroGameType = 'normal' | 'blind';
export type CaroWinModeType = 'blockOpponent' | 'non-blockOpponent';
export type CaroSizeBoardType = 3 | 10 | 15;
export type ChatType = 'yourChat' | 'friendChat';
export type MyGameType = 'caro' | 'connect4';
export type MyAllGameType = MyGameType | 'pikachu';

export type CaroWinType = 'leftDiagonal' | 'rightDiagonal' | 'vertical' | 'horizontal';

export type WinStateType = {
  winMode: Array<CaroWinType>;
  locations: {
    [location: number]: Partial<{ [type in CaroWinType]: boolean }>;
  };
};

export type Connect4WinType = CaroWinType;

export type Connect4WinStateType = {
  winMode: Array<Connect4WinType>;
  locations: {
    [key: string]: Partial<{ [type in Connect4WinType]: boolean }>;
  };
};

export type CaroMessageType = 'chat' | 'move' | 'newGame' | 'undo' | 'sync';
// end caro

// start pikachu
export type PikachuTimeType = 'normal' | 'cumulative';
export type PikachuImgType = 'internal' | 'external';

export type PikachuMoveParamsType = {
  board: Array<Array<number>>;
  numberOfRows: number;
  numberOfColumns: number;
  sourcePiece: PositionType;
  targetPiece: PositionType;
  numberOfLines: number;
};

export type FindPossibleMoveParamsType = {
  numberOfRows: number;
  numberOfColumns: number;
  board: Array<Array<number>>;
  numberOfLines: number;
};

export type PikachuBoardTransformType =
  | 'normal'
  | 'collapseToBottom'
  | 'collapseToTop'
  | 'collapseToLeft'
  | 'collapseToRight'
  | 'divideByHorizontalCenter'
  | 'collapseToHorizontalCenter'
  | 'divideByVerticalCenter'
  | 'collapseToVerticalCenter';
// end pikachu
