import { ComponentProps } from 'react';
import TitleBox from 'src/components/box/TitleBox';
import { WeatherApiType } from 'src/global';
import { cn } from 'src/lib/utils';

interface Props extends ComponentProps<'div'> {
  data: WeatherApiType;
}

export default function ResultSpot({ data, ...props }: Props) {
  return (
    <div {...props} className={cn('border-t pt-3', props.className)}>
      <div className="flex flex-wrap items-center gap-10">
        <TitleBox title="latitude" value={data.latitude} />
        <TitleBox title="longitude" value={data.longitude} />
        <TitleBox title="timezone" value={data.timezone} />
      </div>
    </div>
  );
}
