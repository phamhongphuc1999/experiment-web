import AuthWrapper from 'src/components/AuthWrapper';
import CommonContainer from 'src/components/box/CommonContainer';
import WordLearnView from 'src/views/WordLearnView';

type PageProps = {
  params: Promise<{ id: string }>;
};

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
