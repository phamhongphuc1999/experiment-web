import { MetadataHead } from 'src/components/MetadataHead';
import WeatherView from 'src/views/WeatherView';

export default function Weather() {
  return (
    <>
      <MetadataHead title="Weather" />
      <WeatherView />
    </>
  );
}
