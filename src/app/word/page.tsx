import AuthWrapper from 'src/components/AuthWrapper';
import CommonContainer from 'src/components/box/CommonContainer';
import { generateAppMetadata } from 'src/services';
import WordView from 'src/views/WordView';

export async function generateMetadata() {
  return generateAppMetadata('Word');
}

export default function Word() {
  return (
    <AuthWrapper>
      <CommonContainer>
        <WordView />
      </CommonContainer>
    </AuthWrapper>
  );
}
