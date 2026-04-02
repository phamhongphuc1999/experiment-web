import { generateAppMetadata } from 'src/services';
import BTreeView from 'src/views/BTreeView';

export async function generateMetadata() {
  return generateAppMetadata('B tree');
}

export default function Caro() {
  return <BTreeView />;
}
