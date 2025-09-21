import AuthWrapper from 'src/components/AuthWrapper';
import CommonContainer from 'src/components/box/CommonContainer';
import { generateAppMetadata } from 'src/services';
import WordLearnView from 'src/views/WordLearnView';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata() {
  return generateAppMetadata('Word Learn');
}

export default async function WordLearn({ params }: PageProps) {
  const { id } = await params;

  return (
    <AuthWrapper>
      <CommonContainer className="flex h-full flex-col overflow-hidden">
        <WordLearnView id={id} />
      </CommonContainer>
    </AuthWrapper>
  );
}
