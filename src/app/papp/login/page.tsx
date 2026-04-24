import { Metadata } from 'next';
import { generateAppMetadata } from 'src/services';
import LoginView from 'src/views/PApp/LoginView';

export const metadata: Metadata = generateAppMetadata('Login');

export default function Login() {
  return <LoginView />;
}
