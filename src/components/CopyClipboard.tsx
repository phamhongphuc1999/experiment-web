'use client';

import { Copy, IconProps } from 'iconsax-reactjs';
import { MouseEvent, useState } from 'react';
import { cn } from 'src/lib/utils';
import { CheckIcon } from './icons';

interface Props {
  copyText: string;
  iconprops?: IconProps;
}

export default function CopyClipboard({ copyText, iconprops }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  return (
    <button onClick={handleCopy}>
      {copied ? (
        <CheckIcon {...iconprops} className={cn('size-4 cursor-pointer', iconprops?.className)} />
      ) : (
        <Copy {...iconprops} className={cn('cursor-pointer', iconprops?.className)} />
      )}
    </button>
  );
}
