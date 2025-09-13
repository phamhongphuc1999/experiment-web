'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AppBreadcrumb from 'src/components/AppBreadcrumb';
import AppPagination from 'src/components/AppPagination';
import EmptyBox from 'src/components/box/EmptyBox';
import { ClockLoaderBox } from 'src/components/ClockLoader';
import CopyClipboard from 'src/components/CopyClipboard';
import SearchInput from 'src/components/input/SearchInput';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/shadcn-ui/table';
import { ITEM_PER_PAGE } from 'src/configs/constance';
import { useCategories } from 'src/hooks/queries/word.query';
import { formatText, postgrestMoment } from 'src/services';

export default function WordView() {
  const router = useRouter();
  const [filterText, setFilterText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isPending } = useCategories({
    filter: { title: filterText },
    pagination: { page: currentPage },
  });

  function onRowClick(categoryId: string) {
    router.push(`/word/${categoryId}`);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <AppBreadcrumb items={[{ title: 'Word' }]} />
        <SearchInput
          placeholder="Search category"
          rootprops={{ className: 'w-fit' }}
          value={searchText}
          events={{ setFilterText, setSearchText }}
        />
      </div>
      <Table className="mt-3">
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Create at</TableHead>
            <TableHead>Update at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((category) => {
            return (
              <TableRow
                key={category.id}
                className="cursor-pointer"
                onClick={() => onRowClick(category.id)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <p>{formatText(category.id)}</p>
                    <CopyClipboard copyText={category.id} iconprops={{ size: 16 }} />
                  </div>
                </TableCell>
                <TableCell>{category.title}</TableCell>
                <TableCell>{postgrestMoment(category.create_at)}</TableCell>
                <TableCell>{postgrestMoment(category.update_at)}</TableCell>
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
