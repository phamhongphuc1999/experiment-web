import Link from 'next/link';
import { ReactNode } from 'react';
import { GithubIcon } from '../icons';
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
        <div className="pt-[55px]">{children}</div>
      </div>
      <div className="border-b-border bg-secondary flex w-full flex-col items-center py-[16px] shadow-xl">
        <p className="text-center">COPYRIGHT © {new Date().getFullYear()}&nbsp;</p>
        <div className="flex items-center gap-2">
          <Link href="https://github.com/phamhongphuc1999/experiment-web" target="_blank">
            <GithubIcon className="mt-[4px] h-auto w-[32px]" />
          </Link>
        </div>
      </div>
    </EffectBox>
  );
}
