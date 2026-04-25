import { ReactNode } from 'react';
import PAppLayout from 'src/components/Layouts/PAppLayout';

type TProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: TProps) {
  return <PAppLayout>{children}</PAppLayout>;
}
