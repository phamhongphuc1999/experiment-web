import { generateAppMetadata } from 'src/services';
import ProcessView from 'src/views/ProcessView';

export async function generateMetadata() {
  return generateAppMetadata('Process');
}

export default function Process() {
  return (
    <div className="container pt-1! pb-0!">
      <ProcessView />
    </div>
  );
}
