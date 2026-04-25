import { ReactNode } from 'react';
import ExperimentAppLayout from 'src/components/Layouts/ExperimentAppLayout';

type TProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: TProps) {
  return <ExperimentAppLayout>{children}</ExperimentAppLayout>;
}
