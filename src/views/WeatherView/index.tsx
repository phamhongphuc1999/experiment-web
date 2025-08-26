'use client';

import CommonContainer from 'src/components/box/CommonContainer';
import BaseInput from 'src/components/input/BaseInput';
import SearchLocationDialog from './SearchLocationDialog';
import { useState } from 'react';

export default function WeatherView() {
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();

  return (
    <CommonContainer>
      <form>
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
