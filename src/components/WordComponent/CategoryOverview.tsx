import { CategoryTableType } from 'src/global';
import TitleBox from '../box/TitleBox';
import { postgrestMoment } from 'src/services';
import AddDialog from 'src/views/WordDetailView/dialog/AddDialog';
import { Setting } from 'iconsax-reactjs';
import { useDialogStore } from 'src/states/dialog.state';
import { DIALOG_KEY } from 'src/configs/constance';

interface Props {
  category: CategoryTableType;
}

export default function CategoryOverview({ category }: Props) {
  const { setDialog } = useDialogStore();

  return (
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
  );
}
