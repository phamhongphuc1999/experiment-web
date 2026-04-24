import { Metadata } from 'next';
import { generateAppMetadata } from 'src/services';
import PikachuView from 'src/views/PikachuView';

export const metadata: Metadata = generateAppMetadata('Pikachu');

export default function Pikachu() {
  return <PikachuView />;
}
