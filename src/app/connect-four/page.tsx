import { generateAppMetadata } from 'src/services';
import ConnectFourView from 'src/views/ConnectFourView';

export async function generateMetadata() {
  return generateAppMetadata('Connect 4');
}

export default function ConnectFour() {
  return <ConnectFourView />;
}
