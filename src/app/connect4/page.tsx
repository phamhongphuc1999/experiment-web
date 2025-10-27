import { generateAppMetadata } from 'src/services';
import Connect4View from 'src/views/Connect4View';

export async function generateMetadata() {
  return generateAppMetadata('Connect 4');
}

export default function Connect4() {
  return <Connect4View />;
}
