import { generateAppMetadata } from 'src/services';
import VerifyEmailView from 'src/views/PApp/VerifyEmailView';

export async function generateMetadata() {
  return generateAppMetadata('Verify Email');
}

export default function VerifyEmail() {
  return <VerifyEmailView />;
}
