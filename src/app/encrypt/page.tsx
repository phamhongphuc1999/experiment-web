import CommonContainer from 'src/components/box/CommonContainer';
import { generateAppMetadata } from 'src/services';
import EncryptView from 'src/views/EncryptView';

export async function generateMetadata() {
  return generateAppMetadata('Crypt');
}

export default function Encrypt() {
  return (
    <CommonContainer>
      <EncryptView />
    </CommonContainer>
  );
}
