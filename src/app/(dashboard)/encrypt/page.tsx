import { Metadata } from 'next';
import { generateAppMetadata } from 'src/services';
import EncryptView from 'src/views/EncryptView';

export const metadata: Metadata = generateAppMetadata('Crypt');

export default function Encrypt() {
  return <EncryptView />;
}
