'use client';

import { FormEvent } from 'react';
import CommonContainer from 'src/components/box/CommonContainer';
import BaseInput from 'src/components/input/BaseInput';
import { Button } from 'src/components/shadcn-ui/button';
import { useWeather } from 'src/hooks/queries/weather.query';
import { WeatherParamsSchema } from 'src/schemas/weather.schema';
import { useWeatherParamsStore } from 'src/states/weather-params.state';
import CommonParams from './CommonParams';
import DailyParams from './DailyParams';
import HourlyParams from './HourlyParams';
import ResultSpot from './ResultSpot';
import SearchLocationDialog from './SearchLocationDialog';

export default function WeatherView() {
  const { state, setState, reset } = useWeatherParamsStore();
  const { data, refetch } = useWeather(state, { enabled: false });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (WeatherParamsSchema.isValidSync(state)) {
      await refetch();
    }
  }

  return (
    <CommonContainer>
      <form onSubmit={onSubmit}>
        <div className="flex items-center gap-2">
          <Button type="submit">Submit</Button>
          <Button onClick={reset}>Reset</Button>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex w-full items-center gap-2">
            <BaseInput
              placeholder="Latitude"
              type="number"
              rootprops={{ className: 'md:w-1/4 w-1/3' }}
              value={state.latitude || ''}
              onChange={(event) => setState({ latitude: parseFloat(event.target.value) })}
            />
            <BaseInput
              placeholder="Longitude"
              type="number"
              rootprops={{ className: 'md:w-1/4 w-1/3' }}
              value={state.longitude || ''}
              onChange={(event) => setState({ longitude: parseFloat(event.target.value) })}
            />
          </div>
          <SearchLocationDialog />
        </div>
        <CommonParams className="mt-3" />
        <HourlyParams className="mt-3" />
        <DailyParams className="mt-3" />
      </form>
      {data && <ResultSpot data={data} />}
    </CommonContainer>
  );
}
