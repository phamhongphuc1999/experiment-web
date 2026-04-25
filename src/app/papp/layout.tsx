import { ReactNode, Suspense } from 'react';
import { GoogleAuthProvider } from 'src/context/GoogleAuthProvider';

type TProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: TProps) {
  return (
    <Suspense>
      <GoogleAuthProvider>{children}</GoogleAuthProvider>
    </Suspense>
  );
}
