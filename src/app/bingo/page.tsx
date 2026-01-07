import { generateAppMetadata } from 'src/services';
import BingoView from 'src/views/BingoView';

export async function generateMetadata() {
  return generateAppMetadata('Bingo');
}

export default function Bingo() {
  return <BingoView />;
}
