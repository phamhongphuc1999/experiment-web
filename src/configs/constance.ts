import {
  MyAllGameType,
  PikachuBoardTransformType,
  WeatherDailyVariableType,
  WeatherHourlyVariableType,
} from 'src/global';

export const ITEM_PER_PAGE = 10;
export const MAX_CARO_BOARD_SIZE = 50;
export const MAX_CONNECT4_BOARD_SIZE = 80;

export const PIKACHU_PIECE_SIZE = 52;

export const LS = {
  playMode: 'playMode',
  gameType: 'gameType',
};

export const ENCRYPT_KEY = process.env.NEXT_PUBLIC_ENCRYPT_KEY || '';
export const IV_HEX = process.env.NEXT_PUBLIC_IV_HEX || '00112233445566778899aabbccddeeff';
export const SUPBASE_API_KEY = process.env.NEXT_PUBLIC_SUPBASE_API_KEY || '';
export const SUPBASE_API_URL = process.env.NEXT_PUBLIC_SUPBASE_API_URL || '';
export const ENV = process.env.NEXT_PUBLIC_ENV || 'production';

export const APP_NAME = 'Experiment App';

export const QUERY_KEY = {
  location: 'location',
  weather: 'weather',
  wordCategory: 'wordCategory',
  wordCategoryById: 'wordCategoryById',
  wordPairByCategoryById: 'wordPairByCategoryById',
};

export enum DIALOG_KEY {
  wordConfigDialog = 'wordConfigDialog',
  caroConfigDialog = 'caroConfigDialog',
  caroConnectionDialog = 'caroConnectionDialog',
  caroInstructionDialog = 'caroInstructionDialog',
  connect4ConfigDialog = 'connect4ConfigDialog',
  connect4InstructionDialog = 'connect4InstructionDialog',
  pikachuConfigDialog = 'pikachuConfigDialog',
  pikachuInstructionDialog = 'pikachuInstructionDialog',
  routingGameDialog = 'routingGameDialog',
  changeBoardConfirmDialog = 'changeBoardConfirmDialog',
}

export const gameConfigs: { [game in MyAllGameType]: { title: string } } = {
  caro: { title: 'Caro' },
  connect4: { title: 'Connect4' },
  pikachu: { title: 'Pikachu' },
};

export const pikachuRoundTransformations: Array<PikachuBoardTransformType> = [
  'normal',
  'fallDown',
  'fallUp',
  'shiftLeft',
  'shiftRight',
  'splitHorizontally',
  'mergeHorizontally',
  'splitVertically',
  'mergeVertically',
  'shiftUpLeft',
  'shiftUpRight',
  'shiftDownLeft',
  'shiftDownRight',
  'spreadOut',
  'collapseToCenter',
];

export const pikachuTransformConfig: {
  [id in PikachuBoardTransformType]: { id: PikachuBoardTransformType; title: string };
} = {
  normal: { id: 'normal', title: 'Normal' },
  fallDown: { id: 'fallDown', title: 'Fall down' },
  fallUp: { id: 'fallUp', title: 'Fall up' },
  shiftLeft: { id: 'shiftLeft', title: 'Shift left' },
  shiftRight: { id: 'shiftRight', title: 'Shift right' },
  splitHorizontally: { id: 'splitHorizontally', title: 'Split horizontally' },
  mergeHorizontally: { id: 'mergeHorizontally', title: 'Merge horizontally' },
  splitVertically: { id: 'splitVertically', title: 'Split vertically' },
  mergeVertically: { id: 'mergeVertically', title: 'Merge vertically' },
  shiftUpLeft: { id: 'shiftUpLeft', title: 'Shift up left' },
  shiftUpRight: { id: 'shiftUpRight', title: 'Shift up right' },
  shiftDownLeft: { id: 'shiftDownLeft', title: 'Shift down left' },
  shiftDownRight: { id: 'shiftDownRight', title: 'Shift down right' },
  spreadOut: { id: 'spreadOut', title: 'Spread out' },
  collapseToCenter: { id: 'collapseToCenter', title: 'Collapse to center' },
};

export const PIKACHU_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

export const WeatherHourlyConfig: {
  [id in WeatherHourlyVariableType]: { id: WeatherHourlyVariableType; title: string };
} = {
  temperature_2m: { id: 'temperature_2m', title: 'Temperature 2m' },
  relative_humidity_2m: { id: 'relative_humidity_2m', title: 'Relative Humidity 2m' },
  dew_point_2m: { id: 'dew_point_2m', title: 'Dew Point 2m' },
  apparent_temperature: { id: 'apparent_temperature', title: 'Apparent Temperature' },
  pressure_msl: { id: 'pressure_msl', title: 'Pressure (MSL)' },
  surface_pressure: { id: 'surface_pressure', title: 'Surface Pressure' },
  cloud_cover: { id: 'cloud_cover', title: 'Cloud Cover' },
  cloud_cover_low: { id: 'cloud_cover_low', title: 'Cloud Cover (Low)' },
  cloud_cover_mid: { id: 'cloud_cover_mid', title: 'Cloud Cover (Mid)' },
  cloud_cover_high: { id: 'cloud_cover_high', title: 'Cloud Cover (High)' },
  wind_speed_10m: { id: 'wind_speed_10m', title: 'Wind Speed 10m' },
  wind_speed_80m: { id: 'wind_speed_80m', title: 'Wind Speed 80m' },
  wind_speed_120m: { id: 'wind_speed_120m', title: 'Wind Speed 120m' },
  wind_speed_180m: { id: 'wind_speed_180m', title: 'Wind Speed 180m' },
  wind_direction_10m: { id: 'wind_direction_10m', title: 'Wind Direction 10m' },
  wind_direction_80m: { id: 'wind_direction_80m', title: 'Wind Direction 80m' },
  wind_direction_120m: { id: 'wind_direction_120m', title: 'Wind Direction 120m' },
  wind_direction_180m: { id: 'wind_direction_180m', title: 'Wind Direction 180m' },
  wind_gusts_10m: { id: 'wind_gusts_10m', title: 'Wind Gusts 10m' },
  shortwave_radiation: { id: 'shortwave_radiation', title: 'Shortwave Radiation' },
  direct_radiation: { id: 'direct_radiation', title: 'Direct Radiation' },
  direct_normal_irradiance: { id: 'direct_normal_irradiance', title: 'Direct Normal Irradiance' },
  diffuse_radiation: { id: 'diffuse_radiation', title: 'Diffuse Radiation' },
  global_tilted_irradiance: { id: 'global_tilted_irradiance', title: 'Global Tilted Irradiance' },
  vapour_pressure_deficit: { id: 'vapour_pressure_deficit', title: 'Vapour Pressure Deficit' },
  cape: { id: 'cape', title: 'CAPE' },
  evapotranspiration: { id: 'evapotranspiration', title: 'Evapotranspiration' },
  et0_fao_evapotranspiration: {
    id: 'et0_fao_evapotranspiration',
    title: 'ET0 FAO Evapotranspiration',
  },
  precipitation: { id: 'precipitation', title: 'Precipitation' },
  snowfall: { id: 'snowfall', title: 'Snowfall' },
  precipitation_probability: {
    id: 'precipitation_probability',
    title: 'Precipitation Probability',
  },
  rain: { id: 'rain', title: 'Rain' },
  showers: { id: 'showers', title: 'Showers' },
  snow_depth: { id: 'snow_depth', title: 'Snow Depth' },
  weather_code: { id: 'weather_code', title: 'Weather Code' },
  freezing_level_height: { id: 'freezing_level_height', title: 'Freezing Level Height' },
  visibility: { id: 'visibility', title: 'Visibility' },
  soil_temperature_0cm: { id: 'soil_temperature_0cm', title: 'Soil Temperature 0cm' },
  soil_temperature_6cm: { id: 'soil_temperature_6cm', title: 'Soil Temperature 6cm' },
  soil_temperature_18cm: { id: 'soil_temperature_18cm', title: 'Soil Temperature 18cm' },
  soil_temperature_54cm: { id: 'soil_temperature_54cm', title: 'Soil Temperature 54cm' },
  soil_moisture_0_to_1cm: { id: 'soil_moisture_0_to_1cm', title: 'Soil Moisture 0-1cm' },
  soil_moisture_1_to_3cm: { id: 'soil_moisture_1_to_3cm', title: 'Soil Moisture 1-3cm' },
  soil_moisture_3_to_9cm: { id: 'soil_moisture_3_to_9cm', title: 'Soil Moisture 3-9cm' },
  soil_moisture_9_to_27cm: { id: 'soil_moisture_9_to_27cm', title: 'Soil Moisture 9-27cm' },
  soil_moisture_27_to_81cm: { id: 'soil_moisture_27_to_81cm', title: 'Soil Moisture 27-81cm' },
  is_day: { id: 'is_day', title: 'Is Day' },
};

export const WeatherDailyConfig: {
  [id in WeatherDailyVariableType]: { id: WeatherDailyVariableType; title: string };
} = {
  temperature_2m_max: { id: 'temperature_2m_max', title: 'Max Temperature (°C)' },
  temperature_2m_mean: { id: 'temperature_2m_mean', title: 'Mean Temperature (°C)' },
  temperature_2m_min: { id: 'temperature_2m_min', title: 'Min Temperature (°C)' },
  apparent_temperature_max: {
    id: 'apparent_temperature_max',
    title: 'Max Feels-like Temperature (°C)',
  },
  apparent_temperature_mean: {
    id: 'apparent_temperature_mean',
    title: 'Mean Feels-like Temperature (°C)',
  },
  apparent_temperature_min: {
    id: 'apparent_temperature_min',
    title: 'Min Feels-like Temperature (°C)',
  },
  precipitation_sum: { id: 'precipitation_sum', title: 'Total Precipitation (mm)' },
  rain_sum: { id: 'rain_sum', title: 'Total Rainfall (mm)' },
  showers_sum: { id: 'showers_sum', title: 'Total Showers (mm)' },
  snowfall_sum: { id: 'snowfall_sum', title: 'Total Snowfall (cm)' },
  precipitation_hours: { id: 'precipitation_hours', title: 'Hours with Precipitation' },
  precipitation_probability_max: {
    id: 'precipitation_probability_max',
    title: 'Max Precipitation Probability (%)',
  },
  precipitation_probability_mean: {
    id: 'precipitation_probability_mean',
    title: 'Mean Precipitation Probability (%)',
  },
  precipitation_probability_min: {
    id: 'precipitation_probability_min',
    title: 'Min Precipitation Probability (%)',
  },
  weather_code: { id: 'weather_code', title: 'Weather Code' },
  sunrise: { id: 'sunrise', title: 'Sunrise Time' },
  sunset: { id: 'sunset', title: 'Sunset Time' },
  sunshine_duration: { id: 'sunshine_duration', title: 'Sunshine Duration (s)' },
  daylight_duration: { id: 'daylight_duration', title: 'Daylight Duration (s)' },
  wind_speed_10m_max: { id: 'wind_speed_10m_max', title: 'Max Wind Speed (10m) (km/h)' },
  wind_gusts_10m_max: { id: 'wind_gusts_10m_max', title: 'Max Wind Gusts (10m) (km/h)' },
  wind_direction_10m_dominant: {
    id: 'wind_direction_10m_dominant',
    title: 'Dominant Wind Direction (°)',
  },
  shortwave_radiation_sum: { id: 'shortwave_radiation_sum', title: 'Shortwave Radiation (MJ/m²)' },
  et0_fao_evapotranspiration: {
    id: 'et0_fao_evapotranspiration',
    title: 'Evapotranspiration (mm)',
  },
  uv_index_max: { id: 'uv_index_max', title: 'Max UV Index' },
  uv_index_clear_sky_max: { id: 'uv_index_clear_sky_max', title: 'Max UV Index (Clear Sky)' },
};
