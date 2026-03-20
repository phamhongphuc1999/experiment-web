import { generateAppMetadata } from 'src/services';
import CaroView from 'src/views/CaroView';

export async function generateMetadata() {
  return generateAppMetadata('Caro');
}

export default function Caro() {
  return <CaroView />;
}
