import AuthWrapper from 'src/components/AuthWrapper';
import CommonContainer from 'src/components/box/CommonContainer';
import { generateAppMetadata } from 'src/services';
import WordDetailView from 'src/views/WordDetailView';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata() {
  return generateAppMetadata('Word Detail');
}

export default async function WordDetail({ params }: PageProps) {
  const { id } = await params;

  return (
    <AuthWrapper>
      <CommonContainer className="flex h-full flex-col overflow-hidden">
        <WordDetailView id={id} />
      </CommonContainer>
    </AuthWrapper>
  );
}
