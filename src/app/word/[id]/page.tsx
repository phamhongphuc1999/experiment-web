import AuthWrapper from 'src/components/AuthWrapper';
import CommonContainer from 'src/components/box/CommonContainer';
import WordDetailView from 'src/views/WordDetailView';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function WordDetail({ params }: PageProps) {
  const { id } = await params;

  return (
    <AuthWrapper>
      <CommonContainer>
        <WordDetailView id={id} />
      </CommonContainer>
    </AuthWrapper>
  );
}
