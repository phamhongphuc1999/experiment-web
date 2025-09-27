'use client';

import { CloseCircle, SearchNormal1 } from 'iconsax-reactjs';
import { ComponentProps } from 'react';
import BaseInput from './BaseInput';

interface Props extends ComponentProps<'input'> {
  name: string;
  rootprops?: ComponentProps<'div'>;
  events: {
    setSearchText: (value: string) => void;
  };
}

export default function SearchInput({ name, rootprops, events, ...props }: Props) {
  function onTextChange(text: string) {
    events.setSearchText(text);
  }

  function onResetSearch() {
    events.setSearchText('');
  }

  return (
    <BaseInput
      {...props}
      name={name}
      rootprops={rootprops}
      onChange={(event) => onTextChange(event.target.value)}
      icon={{
        start: <SearchNormal1 className="size-4" />,
        end: <CloseCircle className="size-4 cursor-pointer" onClick={onResetSearch} />,
      }}
    />
  );
}
