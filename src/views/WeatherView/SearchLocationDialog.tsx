'use client';

import debounce from 'lodash/debounce';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/shadcn-ui/dialog';
import { Input } from 'src/components/shadcn-ui/input';
import { LoaderFive } from 'src/components/ui/loader';
import { LocationType } from 'src/global';
import { useLocation } from 'src/hooks/queries/location.query';
import { cn } from 'src/lib/utils';

interface Props {
  setLatitude: Dispatch<SetStateAction<number | undefined>>;
  setLongitude: Dispatch<SetStateAction<number | undefined>>;
}

export default function SearchLocationDialog({ setLatitude, setLongitude }: Props) {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterText, setFilterText] = useState('');

  const { data, isLoading } = useLocation(filterText);

  const _setFilterText = useMemo(
    () =>
      debounce((value: string) => {
        setFilterText(value);
      }, 500),
    []
  );

  function onTextChange(text: string) {
    setSearchText(text);
    _setFilterText(text);
  }

  function onLocation(location: LocationType) {
    setLatitude(location.latitude);
    setLongitude(location.longitude);
    setOpen(false);
    setSearchText('');
    setFilterText('');
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
          <DialogDescription>
            <Input value={searchText} onChange={(event) => onTextChange(event.target.value)} />

            {isLoading ? (
              <div className="mt-4 flex flex-col items-center">
                <LoaderFive text="Loading..." />
              </div>
            ) : (
              <div className="mt-4 cursor-pointer rounded-md border">
                {data?.results.map((item, index) => {
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
                        <p>
                          {item.admin1} ({item.latitude}, {item.longitude})
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
