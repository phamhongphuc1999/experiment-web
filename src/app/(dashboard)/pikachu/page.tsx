import { generateAppMetadata } from 'src/services';
import PikachuView from 'src/views/PikachuView';

export async function generateMetadata() {
  return generateAppMetadata('Pikachu');
}

export default function Pikachu() {
  return <PikachuView />;
}
