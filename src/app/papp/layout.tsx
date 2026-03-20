import { ReactNode } from 'react';
import { GoogleAuthProvider } from 'src/context/GoogleAuthProvider';

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return <GoogleAuthProvider>{children}</GoogleAuthProvider>;
}
