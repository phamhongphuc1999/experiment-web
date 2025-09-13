'use client';

import { Copy, CopySuccess, IconProps } from 'iconsax-reactjs';
import { MouseEvent, useState } from 'react';
import { cn } from 'src/lib/utils';

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
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  return (
    <button onClick={handleCopy}>
      {copied ? (
        <CopySuccess {...iconprops} className={cn('cursor-pointer', iconprops?.className)} />
      ) : (
        <Copy {...iconprops} className={cn('cursor-pointer', iconprops?.className)} />
      )}
    </button>
  );
}
