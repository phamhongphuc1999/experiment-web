'use client';

import AppBreadcrumb from 'src/components/AppBreadcrumb';
import EmptyBox from 'src/components/box/EmptyBox';
import { ClockLoaderBox } from 'src/components/ClockLoader';
import CategoryOverview from 'src/components/WordComponent/CategoryOverview';
import { CategoryTableType } from 'src/global';
import { useCategoryById, usePairByCategoryId } from 'src/hooks/queries/word.query';
import PairView from './PairView';

interface LayoutProps {
  category: CategoryTableType;
}

function WordDetailViewLayout({ category }: LayoutProps) {
  const { data: pairs, isPending } = usePairByCategoryId(category.id);

  return (
    <div className="flex h-full flex-col">
      <AppBreadcrumb items={[{ title: 'Word', href: '/word' }, { title: category.title }]} />
      <CategoryOverview showLearn category={category} />
      <div className="mt-3 min-h-0 flex-1 overflow-auto">
        {isPending ? (
          <ClockLoaderBox iconProps={{ size: 48 }} />
        ) : (
          <div>
            {pairs?.data == undefined || pairs?.data?.length == 0 ? (
              <EmptyBox />
            ) : (
              <PairView pairs={pairs.data} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface Props {
  id: string;
}

export default function WordDetailView({ id }: Props) {
  const { data: category, isPending } = useCategoryById(id);

  return isPending || category?.data == undefined ? (
    <ClockLoaderBox iconProps={{ size: 48 }} />
  ) : (
    <WordDetailViewLayout category={category.data} />
  );
}
