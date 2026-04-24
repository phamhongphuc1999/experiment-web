import { Metadata } from 'next';
import { generateAppMetadata } from 'src/services';
import VerifyEmailView from 'src/views/PApp/VerifyEmailView';

export const metadata: Metadata = generateAppMetadata('Verify Email');

export default function VerifyEmail() {
  return <VerifyEmailView />;
}
