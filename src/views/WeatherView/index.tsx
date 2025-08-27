'use client';

import { FormEvent, useState } from 'react';
import CommonContainer from 'src/components/box/CommonContainer';
import BaseInput from 'src/components/input/BaseInput';
import { Button } from 'src/components/shadcn-ui/button';
import { useWeather } from 'src/hooks/queries/weather.query';
import { WeatherParamsSchema } from 'src/schemas/weather.schema';
import SearchLocationDialog from './SearchLocationDialog';

export default function WeatherView() {
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();

  const { refetch } = useWeather({ latitude, longitude }, { enabled: false });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (WeatherParamsSchema.isValidSync({ latitude, longitude })) {
      await refetch();
    }
  }

  function onReset() {
    setLatitude(undefined);
    setLongitude(undefined);
  }

  return (
    <CommonContainer>
      <form onSubmit={onSubmit}>
        <div className="flex items-center gap-2">
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={onReset}>
            Reset
          </Button>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex w-full items-center gap-2">
            <BaseInput
              placeholder="Latitude"
              type="number"
              rootprops={{ className: 'md:w-1/4 w-1/3' }}
              value={latitude}
              onChange={(event) => setLatitude(parseFloat(event.target.value))}
            />
            <BaseInput
              placeholder="Longitude"
              type="number"
              rootprops={{ className: 'md:w-1/4 w-1/3' }}
              value={longitude}
              onChange={(event) => setLongitude(parseFloat(event.target.value))}
            />
          </div>
          <SearchLocationDialog setLatitude={setLatitude} setLongitude={setLongitude} />
        </div>
      </form>
    </CommonContainer>
  );
}
