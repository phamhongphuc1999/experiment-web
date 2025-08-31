import { CheckedState } from '@radix-ui/react-checkbox';
import { ComponentProps } from 'react';
import { Checkbox } from 'src/components/shadcn-ui/checkbox';
import { Label } from 'src/components/shadcn-ui/label';
import { WeatherHourlyConfig } from 'src/configs/constance';
import { WeatherHourlyVariableType } from 'src/global';
import { cn } from 'src/lib/utils';
import { useWeatherParamsStore } from 'src/states/weather-params.state';

export default function HourlyParams(props: ComponentProps<'div'>) {
  const { state, setState } = useWeatherParamsStore();

  function onCheckChange(checked: CheckedState, id: WeatherHourlyVariableType) {
    const prevState = state.hourly || [];
    if (checked) setState({ hourly: [...prevState, id] });
    else setState({ hourly: prevState.filter((v) => v !== id) });
  }

  return (
    <div {...props} className={cn('gap-10 rounded-md border p-3', props.className)}>
      <p className="text-lg font-semibold">Hourly Weather Variables</p>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {Object.values(WeatherHourlyConfig).map((item) => {
          return (
            <div key={item.id} className="flex cursor-pointer items-center gap-2">
              <Checkbox
                id={item.id}
                checked={state.hourly?.includes(item.id)}
                onCheckedChange={(checked) => onCheckChange(checked, item.id)}
              />
              <Label htmlFor={item.id}>{item.title}</Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
