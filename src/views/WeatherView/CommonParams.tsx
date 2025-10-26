'use client';

import { Select } from '@radix-ui/react-select';
import { ComponentProps } from 'react';
import TitleBox from 'src/components/box/TitleBox';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'src/components/shadcn-ui/select';
import { TemperatureUnitType, WindSpeedUnitType } from 'src/global';
import { cn } from 'src/lib/utils';
import { useWeatherParamsStore } from 'src/states/weather-params.state';

export default function CommonParams(props: ComponentProps<'div'>) {
  const { setState } = useWeatherParamsStore();

  return (
    <div
      {...props}
      className={cn('flex flex-wrap items-center gap-10 rounded-md border p-3', props.className)}
    >
      <TitleBox
        title="Temperature unit"
        value={
          <Select
            onValueChange={(value) => setState({ temperature_unit: value as TemperatureUnitType })}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Unit</SelectLabel>
                <SelectItem value="celsius">Celsius</SelectItem>
                <SelectItem value="fahrenheit">Fahrenheit</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        }
      />
      <TitleBox
        title="Wind speed unit"
        value={
          <Select
            onValueChange={(value) => setState({ wind_speed_unit: value as WindSpeedUnitType })}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Unit</SelectLabel>
                <SelectItem value="kmh">kmh</SelectItem>
                <SelectItem value="ms">ms</SelectItem>
                <SelectItem value="mph">mph</SelectItem>
                <SelectItem value="kn">kn</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
}
