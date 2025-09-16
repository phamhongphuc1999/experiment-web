'use client';

import { CheckedState } from '@radix-ui/react-checkbox';
import { ArrowDown2 } from 'iconsax-reactjs';
import { ComponentProps, useMemo, useState } from 'react';
import EmptyBox from 'src/components/box/EmptyBox';
import SearchInput from 'src/components/input/SearchInput';
import { Checkbox } from 'src/components/shadcn-ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from 'src/components/shadcn-ui/collapsible';
import { Label } from 'src/components/shadcn-ui/label';
import { WeatherHourlyConfig } from 'src/configs/constance';
import { WeatherHourlyVariableType } from 'src/global';
import { cn } from 'src/lib/utils';
import { useWeatherParamsStore } from 'src/states/weather-params.state';
import { useDebounceValue } from 'usehooks-ts';

export default function HourlyParams(props: ComponentProps<'div'>) {
  const [isOpen, setIsOpen] = useState(false);
  const { state, setState } = useWeatherParamsStore();
  const [searchText, setSearchText] = useState('');
  const [debouncedText] = useDebounceValue(searchText, 500);

  const config = useMemo(() => {
    const rawConfig = Object.values(WeatherHourlyConfig);
    return rawConfig.filter((item) =>
      item.title.toLowerCase().includes(debouncedText.toLowerCase())
    );
  }, [debouncedText]);

  function onCheckChange(checked: CheckedState, id: WeatherHourlyVariableType) {
    const prevState = state.hourly || [];
    if (checked) setState({ hourly: [...prevState, id] });
    else setState({ hourly: prevState.filter((v) => v !== id) });
  }

  function onCollapseClose(open: boolean) {
    setIsOpen(open);
  }

  return (
    <div {...props} className={cn('gap-10 rounded-md border p-3', props.className)}>
      <Collapsible onOpenChange={onCollapseClose}>
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <div className="flex cursor-pointer items-center gap-2">
            <p className="text-lg font-semibold">Hourly Weather Variables</p>
            <ArrowDown2 className={cn('size-4 transition duration-100', isOpen && 'rotate-180')} />
          </div>
          <SearchInput
            rootprops={{ onClick: (event) => event.stopPropagation(), className: 'max-w-1/4' }}
            placeholder="Search hourly params"
            value={searchText}
            events={{ setSearchText }}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {config.map((item) => {
              return (
                <div key={item.id} className="flex cursor-pointer items-center gap-2">
                  <Checkbox
                    id={item.id}
                    checked={Boolean(state.hourly?.includes(item.id))}
                    onCheckedChange={(checked) => onCheckChange(checked, item.id)}
                  />
                  <Label htmlFor={item.id}>{item.title}</Label>
                </div>
              );
            })}
          </div>
          {config.length == 0 && <EmptyBox />}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
