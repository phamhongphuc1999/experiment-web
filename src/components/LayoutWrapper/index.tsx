import { ReactNode } from 'react';
import { Toaster } from '../shadcn-ui/sonner';
import AppHeader from './AppHeader';
import EffectBox from './EffectBox';

interface Props {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: Props) {
  return (
    <EffectBox>
      <div className="min-h-screen">
        <AppHeader />
        <Toaster expand={true} position="top-right" richColors />
        <div className="h-screen pt-[55px]">{children}</div>
      </div>
    </EffectBox>
  );
}
