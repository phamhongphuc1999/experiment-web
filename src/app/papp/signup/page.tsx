import { generateAppMetadata } from 'src/services';
import SignupView from 'src/views/PApp/SignupView';

export async function generateMetadata() {
  return generateAppMetadata('Signup');
}

export default function Signup() {
  return <SignupView />;
}
