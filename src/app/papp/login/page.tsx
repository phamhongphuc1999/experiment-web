import { generateAppMetadata } from 'src/services';
import LoginView from 'src/views/PApp/LoginView';

export async function generateMetadata() {
  return generateAppMetadata('PApp | Login');
}

export default function Login() {
  return <LoginView />;
}
