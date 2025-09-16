'use client';

import { Location } from 'iconsax-reactjs';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import EmptyBox from 'src/components/box/EmptyBox';
import ClockLoader from 'src/components/ClockLoader';
import SearchInput from 'src/components/input/SearchInput';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/shadcn-ui/dialog';
import { LocationType } from 'src/global';
import { useLocation } from 'src/hooks/queries/location.query';
import { cn } from 'src/lib/utils';
import { useWeatherParamsStore } from 'src/states/weather-params.state';
import { useWeatherStore } from 'src/states/weather.state';
import { useDebounceValue } from 'usehooks-ts';

export default function SearchLocationDialog() {
  const { setState } = useWeatherParamsStore();
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { locations, enqueueLocation } = useWeatherStore();
  const [debouncedText] = useDebounceValue(searchText, 500);

  const { data, isLoading } = useLocation(debouncedText);

  const { realData, isRecent } = useMemo(() => {
    if (debouncedText.length > 0) return { realData: data?.results || [], isRecent: false };
    return { realData: locations, isRecent: true };
  }, [data?.results, debouncedText.length, locations]);

  function onLocation(location: LocationType) {
    enqueueLocation(location);
    setState({ latitude: location.latitude, longitude: location.longitude });
    setOpen(false);
    setSearchText('');
  }

  function gps() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
      },
      (err) => {
        console.error(err);
      }
    );
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="flex cursor-pointer items-center gap-2"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" /> Search
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search location</DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex items-center gap-3">
            <SearchInput
              value={searchText}
              placeholder="Search location"
              events={{ setSearchText }}
            />
            <Location className="size-8 cursor-pointer" onClick={gps} />
          </div>
          {isLoading ? (
            <div className="mt-4 flex flex-col items-center">
              <ClockLoader />
            </div>
          ) : (
            <div className="mt-4">
              {isRecent && <p className="text-right">Recent</p>}
              <div
                className={cn('mt-2 cursor-pointer rounded-md', realData.length > 0 && 'border')}
              >
                {realData.map((item, index) => {
                  const code = item.country_code;

                  return (
                    <div
                      key={item.id}
                      className={cn('px-4 py-1', index > 0 && 'border-t')}
                      onClick={() => onLocation(item)}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <Image
                            src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
                            alt={`${code} flag`}
                            width={20}
                            height={20}
                          />
                          <p>
                            <span className="text-secondary-foreground text-lg">{item.name}</span> (
                            {item.country})
                          </p>
                        </div>
                        <p className="text-muted-foreground text-xs">
                          {item.admin1} ({item.latitude}, {item.longitude})
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {realData.length == 0 && <EmptyBox title="No locations found" />}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
