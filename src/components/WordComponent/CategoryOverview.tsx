import { Setting } from 'iconsax-reactjs';
import Link from 'next/link';
import { DIALOG_KEY } from 'src/configs/constance';
import { CategoryTableType } from 'src/global';
import { postgrestMoment } from 'src/services';
import { useDialogStore } from 'src/states/dialog.state';
import AddDialog from 'src/views/WordDetailView/dialog/AddDialog';
import TitleBox from '../box/TitleBox';
import { Button } from '../shadcn-ui/button';

interface Props {
  showLearn?: boolean;
  category: CategoryTableType;
}

export default function CategoryOverview({ showLearn = false, category }: Props) {
  const { setDialog } = useDialogStore();

  return (
    <div className="mt-3 flex flex-wrap items-center gap-6 rounded-sm border p-3">
      <TitleBox title="Title" value={category.title} />
      <TitleBox title="Create at" value={postgrestMoment(category.create_at)} />
      <TitleBox title="Update at" value={postgrestMoment(category.update_at)} />
      <AddDialog categoryId={category.id} categoryTitle={category.title} />
      {showLearn && (
        <Link href={`/word/learn/${category.id}`}>
          <Button>Learn</Button>
        </Link>
      )}
      <Setting
        className="cursor-pointer"
        onClick={() => setDialog(DIALOG_KEY.wordConfigDialog, true)}
      />
    </div>
  );
}
