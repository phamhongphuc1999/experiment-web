import { Metadata } from 'next';
import { generateAppMetadata } from 'src/services';
import CaroView from 'src/views/CaroView';

export const metadata: Metadata = generateAppMetadata('Caro');

export default function Caro() {
  return <CaroView />;
}
