import WeatherView from 'src/views/WeatherView';

export async function generateMetadata() {
  return { title: 'Experiment App | Weather', openGraph: { title: 'Experiment App | Weather' } };
}

export default function Weather() {
  return <WeatherView />;
}
