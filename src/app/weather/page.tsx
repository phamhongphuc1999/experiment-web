import { generateAppMetadata } from 'src/services';
import WeatherView from 'src/views/WeatherView';

export async function generateMetadata() {
  return generateAppMetadata('Weather');
}

export default function Weather() {
  return <WeatherView />;
}
