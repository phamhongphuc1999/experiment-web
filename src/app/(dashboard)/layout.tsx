import { ReactNode } from 'react';
import ExperimentAppLayout from 'src/components/Layouts/ExperimentAppLayout';

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return <ExperimentAppLayout>{children}</ExperimentAppLayout>;
}
