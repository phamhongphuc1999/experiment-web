'use client';

import { CloseCircle, SearchNormal1 } from 'iconsax-reactjs';
import { debounce } from 'lodash';
import { ComponentProps, useMemo } from 'react';
import BaseInput from './BaseInput';

interface Props extends ComponentProps<'input'> {
  rootprops?: ComponentProps<'div'>;
  events: {
    setSearchText: (value: string) => void;
    setFilterText: (value: string) => void;
  };
}

export default function SearchInput({ rootprops, events, ...props }: Props) {
  const _setFilterText = useMemo(
    () =>
      debounce((value: string) => {
        events.setFilterText(value);
      }, 500),
    [events]
  );

  function onTextChange(text: string) {
    events.setSearchText(text);
    _setFilterText(text);
  }

  function onResetSearch() {
    events.setSearchText('');
    events.setFilterText('');
  }

  return (
    <BaseInput
      {...props}
      rootprops={rootprops}
      onChange={(event) => onTextChange(event.target.value)}
      icon={{
        start: <SearchNormal1 className="size-4" />,
        end: <CloseCircle className="size-4 cursor-pointer" onClick={onResetSearch} />,
      }}
    />
  );
}
