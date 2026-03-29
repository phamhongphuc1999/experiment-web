'use client';

import { PropsWithChildren } from 'react';
import AppHeader from './AppHeader';

export default function PAppLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <div className="relative container flex flex-1 flex-col pt-17!">{children}</div>
    </div>
  );
}
