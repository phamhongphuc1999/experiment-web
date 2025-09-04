import LoginView from 'src/views/LoginView';

export async function generateMetadata() {
  return { title: 'Experiment App | Login', openGraph: { title: 'Experiment App | Login' } };
}

export default function Login() {
  return <LoginView />;
}
