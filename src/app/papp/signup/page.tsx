import { Metadata } from 'next';
import { generateAppMetadata } from 'src/services';
import SignupView from 'src/views/PApp/SignupView';

export const metadata: Metadata = generateAppMetadata('Singup');

export default function Signup() {
  return <SignupView />;
}
