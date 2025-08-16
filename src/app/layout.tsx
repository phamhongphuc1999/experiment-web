import { Fira_Code } from 'next/font/google';
import { ReactNode } from 'react';
import LayoutWrapper from 'src/components/LayoutWrapper';
import { MetadataHead } from 'src/components/MetadataHead';
import '../styles/globals.css';

const firaCode = Fira_Code({ subsets: ['latin'] });

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <MetadataHead />
      <body data-theme="dark" className={`${firaCode.className} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
