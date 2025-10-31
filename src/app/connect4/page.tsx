import { generateAppMetadata } from 'src/services';
import Connect4View from 'src/views/Connect4View';

export async function generateMetadata() {
  return generateAppMetadata('Connect Four');
}

export default function Connect4() {
  return <Connect4View />;
}
