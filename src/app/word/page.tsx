import CommonContainer from 'src/components/box/CommonContainer';
import WordView from 'src/views/WordView';

export async function generateMetadata() {
  return { title: 'Experiment App | Word', openGraph: { title: 'Experiment App | Word' } };
}

export default function Word() {
  return (
    <CommonContainer>
      <WordView />
    </CommonContainer>
  );
}
