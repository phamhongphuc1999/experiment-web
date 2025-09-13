import { Trash } from 'iconsax-reactjs';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import TitleBox from 'src/components/box/TitleBox';
import SearchInput from 'src/components/input/SearchInput';
import { Button } from 'src/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/shadcn-ui/dialog';
import { PairTableType, WordModeType } from 'src/global';
import { useNewPairs } from 'src/hooks/actions/word.action';
import { usePairByCategoryId } from 'src/hooks/queries/word.query';
import { AddWordSchema } from 'src/schemas/word.schema';
import * as uuid from 'uuid';
import WordSelect from '../WordSelect';

interface Props {
  categoryId: string;
  categoryTitle: string;
}

export default function AddDialog({ categoryId, categoryTitle }: Props) {
  const { mutate } = useNewPairs();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<{ [id: string]: PairTableType }>({});
  const [searchEn, setSearchEn] = useState('');
  const [filterEn, setFilterEn] = useState('');
  const [searchVi, setSearchVi] = useState('');
  const [filterVi, setFilterVi] = useState('');
  const [note, setNote] = useState<WordModeType | undefined>(undefined);
  const { refetch } = usePairByCategoryId(categoryId);

  function onAddPair() {
    if (AddWordSchema.isValidSync({ en: filterEn, vi: filterVi })) {
      const id = uuid.v4();
      const _value = { id, en: filterEn, vi: filterVi, note, category_id: categoryId };
      setData((preValue) => {
        return { ...preValue, [id]: { ..._value } };
      });

      setSearchEn('');
      setFilterEn('');
      setSearchVi('');
      setFilterVi('');
      setNote(undefined);
    } else toast.error('Please fill new pair');
  }

  function onRemovePair(id: string) {
    setData((preValue) => {
      const newValue = { ...preValue };
      delete newValue[id];
      return newValue;
    });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = Object.values(data).map((item) => ({
      en: item.en,
      vi: item.vi,
      category_id: item.category_id,
      note: item.note,
    }));
    if (result.length > 0) {
      mutate(result);
      refetch();
      toast.success('add successfully');
      setSearchEn('');
      setFilterEn('');
      setSearchVi('');
      setFilterVi('');
      setNote(undefined);
      setData({});
      setOpen(false);
    } else toast.error('new pairs is empty');
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <Button>Add pairs</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add pairs</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="flex items-center gap-3">
            <Button type="submit" color="secondary">
              Confirm
            </Button>
            <Button onClick={onAddPair}>Add</Button>
          </div>
          <div className="mt-3">
            {Object.values(data).map((item) => {
              return (
                <div
                  key={item.id}
                  className="hover:bg-muted flex items-center justify-between gap-3 rounded-sm p-2"
                >
                  <div className="flex items-center gap-3">
                    <TitleBox title="en" value={item.en} />
                    <TitleBox title="vi" value={item.vi} />
                    <TitleBox title="note" value={item.note} />
                  </div>
                  <Trash
                    size={14}
                    className="cursor-pointer"
                    onClick={() => onRemovePair(item.id)}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-3 gap-3 border-t pt-2">
            <TitleBox title="Category" value={categoryTitle} />
            <SearchInput
              placeholder="en"
              value={searchEn}
              events={{ setFilterText: setFilterEn, setSearchText: setSearchEn }}
            />
            <SearchInput
              placeholder="vi"
              value={searchVi}
              events={{ setFilterText: setFilterVi, setSearchText: setSearchVi }}
            />
            <TitleBox
              title="Note"
              value={
                <WordSelect
                  selectedValue={note}
                  onValueChange={(value) => {
                    if ((value as string) == 'null') setNote(undefined);
                    else setNote(value);
                  }}
                />
              }
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
