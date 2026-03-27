import { ReactNode, Suspense } from 'react';
import { GoogleAuthProvider } from 'src/context/GoogleAuthProvider';

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <Suspense>
      <GoogleAuthProvider>{children}</GoogleAuthProvider>
    </Suspense>
  );
}
