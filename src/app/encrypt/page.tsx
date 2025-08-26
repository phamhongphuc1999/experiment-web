import CommonContainer from 'src/components/box/CommonContainer';
import { MetadataHead } from 'src/components/MetadataHead';
import EncryptView from 'src/views/EncryptView';

export default function Encrypt() {
  return (
    <CommonContainer>
      <MetadataHead title="Encrypt" />
      <EncryptView />
    </CommonContainer>
  );
}
