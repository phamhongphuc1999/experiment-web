'use client';

import { ArrowDown2, ArrowUp2, Setting } from 'iconsax-reactjs';
import Link from 'next/link';
import { useState } from 'react';
import AppBreadcrumb from 'src/components/AppBreadcrumb';
import AppPagination from 'src/components/AppPagination';
import EmptyBox from 'src/components/box/EmptyBox';
import { ClockLoaderBox } from 'src/components/ClockLoader';
import CopyClipboard from 'src/components/CopyClipboard';
import SearchInput from 'src/components/input/SearchInput';
import { Button } from 'src/components/shadcn-ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/shadcn-ui/table';
import { DIALOG_KEY, ITEM_PER_PAGE } from 'src/configs/constance';
import { CategorySortByType, SortOrderType } from 'src/global';
import { useCategories } from 'src/hooks/queries/word.query';
import { formatText, postgrestMoment } from 'src/services';
import { useDialogStore } from 'src/states/dialog.state';
import { useDebounceValue } from 'usehooks-ts';

export default function WordView() {
  const { setDialog } = useDialogStore();
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<CategorySortByType>('update_at');
  const [orderBy, setOrderBy] = useState<SortOrderType>('descending');
  const [debouncedText] = useDebounceValue(searchText, 500);

  const { data, isPending } = useCategories({
    filter: { title: debouncedText, sortBy, sortOrder: orderBy },
    pagination: { page: currentPage },
  });

  function onSort(_sortBy: CategorySortByType) {
    if (_sortBy == sortBy)
      setOrderBy((preValue) => (preValue == 'ascending' ? 'descending' : 'ascending'));
    else {
      setSortBy(_sortBy);
      setOrderBy('descending');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AppBreadcrumb items={[{ title: 'Word' }]} />
          <Setting
            size={14}
            className="cursor-pointer"
            onClick={() => setDialog(DIALOG_KEY.wordConfigDialog, true)}
          />
        </div>
        <SearchInput
          placeholder="Search category"
          name="search-category"
          rootprops={{ className: 'w-fit' }}
          value={searchText}
          events={{ setSearchText }}
        />
      </div>
      <Table className="mt-3">
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead onClick={() => onSort('create_at')}>
              <div className="flex cursor-pointer items-center gap-2">
                <p>Create at</p>
                {sortBy == 'create_at' && (
                  <div>
                    {orderBy == 'ascending' ? <ArrowDown2 size={16} /> : <ArrowUp2 size={16} />}
                  </div>
                )}
              </div>
            </TableHead>
            <TableHead onClick={() => onSort('update_at')}>
              <div className="flex cursor-pointer items-center gap-2">
                <p>Update at</p>
                {sortBy == 'update_at' && (
                  <div>
                    {orderBy == 'ascending' ? <ArrowDown2 size={16} /> : <ArrowUp2 size={16} />}
                  </div>
                )}
              </div>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((category) => {
            return (
              <TableRow key={category.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <p>{formatText(category.id)}</p>
                    <CopyClipboard copyText={category.id} iconprops={{ size: 16 }} />
                  </div>
                </TableCell>
                <TableCell>{category.title}</TableCell>
                <TableCell>{postgrestMoment(category.create_at)}</TableCell>
                <TableCell>{postgrestMoment(category.update_at)}</TableCell>
                <TableCell>
                  <Link href={`/word/${category.id}`}>
                    <Button>Play</Button>
                  </Link>
                  <Link href={`/word/learn/${category.id}`} className="ml-2">
                    <Button>Learn</Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {isPending ? (
        <ClockLoaderBox iconProps={{ size: 48 }} className="mt-3" />
      ) : (
        <AppPagination
          className="flex justify-end"
          currentPage={currentPage}
          totalPages={Math.ceil((data?.count || 0) / ITEM_PER_PAGE)}
          events={{ onPageChange: (page) => setCurrentPage(page) }}
        />
      )}
      {data?.data?.length == 0 && <EmptyBox />}
    </div>
  );
}
