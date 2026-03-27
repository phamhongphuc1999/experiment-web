'use client';

import { PropsWithChildren } from 'react';
import AppHeader from './AppHeader';

export default function PAppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <div className="pt-15">{children}</div>
    </div>
  );
}
