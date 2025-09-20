import { generateAppMetadata } from 'src/services';
import LoginView from 'src/views/LoginView';

export async function generateMetadata() {
  return generateAppMetadata('Login');
}

export default function Login() {
  return <LoginView />;
}
