import { Fira_Code } from 'next/font/google';
import { ReactNode } from 'react';
import LayoutWrapper from 'src/components/LayoutWrapper';
import { MetadataHead } from 'src/components/MetadataHead';
import { APP_NAME } from 'src/configs/constance';
import '../styles/globals.css';

const firaCode = Fira_Code({ subsets: ['latin'] });

export const metadata = {
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
            src="https://www.googletagmanager.com/ns.html?id=GTM-5DTLDHPJ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
