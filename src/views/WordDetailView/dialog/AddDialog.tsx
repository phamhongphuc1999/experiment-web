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
import { beVietnamPro } from 'src/configs/font-family';
import { PairTableType, WordModeType } from 'src/global';
import { useNewPairs } from 'src/hooks/actions/word.action';
import { usePairByCategoryId } from 'src/hooks/queries/word.query';
import { cn } from 'src/lib/utils';
import { AddWordSchema } from 'src/schemas/word.schema';
import { useDebounceValue } from 'usehooks-ts';
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
  const [debouncedEn] = useDebounceValue(searchEn, 500);
  const [searchVi, setSearchVi] = useState('');
  const [debouncedVi] = useDebounceValue(searchVi, 500);
  const [note, setNote] = useState<WordModeType | undefined>(undefined);
  const { refetch } = usePairByCategoryId(categoryId);
  const _data = Object.values(data);

  function onAddPair() {
    if (AddWordSchema.safeParse({ en: debouncedEn, vi: debouncedVi }).success) {
      const id = uuid.v4();
      const _value = { id, en: debouncedEn, vi: debouncedVi, note, category_id: categoryId };
      setData((preValue) => {
        return { ...preValue, [id]: { ..._value } };
      });

      setSearchEn('');
      setSearchVi('');
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
      setSearchVi('');
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
            <Button type="submit" color="secondary" disabled={_data.length == 0}>
              Confirm
            </Button>
            <Button onClick={onAddPair} disabled={searchEn.length == 0 || searchVi.length == 0}>
              Add
            </Button>
          </div>
          <div className="mt-3 h-52 overflow-y-scroll">
            {_data.reverse().map((item) => {
              return (
                <div
                  key={item.id}
                  className="hover:bg-muted mt-1 flex items-center justify-between gap-3 rounded-sm border p-2"
                >
                  <div className="flex flex-1 flex-wrap items-center gap-3">
                    <TitleBox
                      title="en"
                      value={item.en}
                      valueProps={{ className: 'text-nowrap' }}
                    />
                    <TitleBox
                      title="vi"
                      value={item.vi}
                      valueProps={{ className: cn('text-nowrap', beVietnamPro.className) }}
                    />
                    <TitleBox
                      title="note"
                      value={item.note || '--'}
                      valueProps={{ className: 'text-nowrap' }}
                    />
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
              events={{ setSearchText: setSearchEn }}
            />
            <SearchInput
              placeholder="vi"
              value={searchVi}
              events={{ setSearchText: setSearchVi }}
              className={cn(beVietnamPro.className, 'font-sans')}
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
