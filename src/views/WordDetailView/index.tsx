'use client';

import { Setting } from 'iconsax-reactjs';
import AppBreadcrumb from 'src/components/AppBreadcrumb';
import EmptyBox from 'src/components/box/EmptyBox';
import TitleBox from 'src/components/box/TitleBox';
import { ClockLoaderBox } from 'src/components/ClockLoader';
import { DIALOG_KEY } from 'src/configs/constance';
import { CategoryTableType } from 'src/global';
import { useCategoryById, usePairByCategoryId } from 'src/hooks/queries/word.query';
import { postgrestMoment } from 'src/services';
import { useDialogStore } from 'src/states/dialog.state';
import AddDialog from './dialog/AddDialog';
import PairView from './PairView';

interface LayoutProps {
  category: CategoryTableType;
}

function WordDetailViewLayout({ category }: LayoutProps) {
  const { setDialog } = useDialogStore();
  const { data: pairs, isPending } = usePairByCategoryId(category.id);

  return (
    <>
      <AppBreadcrumb items={[{ title: 'Word', href: '/word' }, { title: category.title }]} />
      <div className="mt-3 flex flex-wrap items-center gap-6 rounded-sm border p-3">
        <TitleBox title="Title" value={category.title} />
        <TitleBox title="Create at" value={postgrestMoment(category.create_at)} />
        <TitleBox title="Update at" value={postgrestMoment(category.update_at)} />
        <AddDialog categoryId={category.id} categoryTitle={category.title} />
        <Setting
          className="cursor-pointer"
          onClick={() => setDialog(DIALOG_KEY.wordConfigDialog, true)}
        />
      </div>
      <div className="mt-3">
        {isPending ? (
          <ClockLoaderBox iconProps={{ size: 48 }} />
        ) : (
          <>
            {pairs?.data == undefined || pairs?.data?.length == 0 ? (
              <EmptyBox />
            ) : (
              <PairView pairs={pairs.data} />
            )}
          </>
        )}
      </div>
    </>
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
