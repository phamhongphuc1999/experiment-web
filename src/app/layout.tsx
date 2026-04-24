import { Metadata } from 'next';
import { Fira_Code } from 'next/font/google';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import EffectBox from 'src/components/Layouts/EffectBox';
import { MetadataHead } from 'src/components/MetadataHead';
import { APP_NAME } from 'src/configs/constance';
import '../styles/globals.css';

const firaCode = Fira_Code({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: '%s',
  },
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <MetadataHead />
      <body data-theme="dark" className={`${firaCode.className} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W3M57J7H"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <EffectBox>
          <Toaster expand={true} position="top-right" richColors />
          {children}
        </EffectBox>
      </body>
    </html>
  );
}
