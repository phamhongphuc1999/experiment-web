import CommonContainer from 'src/components/box/CommonContainer';
import EncryptView from 'src/views/EncryptView';

export async function generateMetadata() {
  return { title: 'Experiment App | Encrypt', openGraph: { title: 'Experiment App | Encrypt' } };
}

export default function Encrypt() {
  return (
    <CommonContainer>
      <EncryptView />
    </CommonContainer>
  );
}
