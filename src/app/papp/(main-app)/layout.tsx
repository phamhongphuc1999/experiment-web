import { ReactNode } from 'react';
import PAppLayout from 'src/components/Layouts/PAppLayout';

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return <PAppLayout>{children}</PAppLayout>;
}
