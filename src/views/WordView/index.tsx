'use client';

import { useRouter } from 'next/navigation';
import EmptyBox from 'src/components/box/EmptyBox';
import ClockLoader from 'src/components/ClockLoader';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/shadcn-ui/table';
import { useCategories } from 'src/hooks/queries/word.query';
import { postgrestMoment } from 'src/services';

export default function WordView() {
  const { data, isPending } = useCategories();
  const router = useRouter();

  function onRowClick(categoryId: string) {
    router.push(`/word/${categoryId}`);
  }

  return (
    <div>
      <Table>
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
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.title}</TableCell>
                <TableCell>{postgrestMoment(category.create_at)}</TableCell>
                <TableCell>{postgrestMoment(category.update_at)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {isPending && <ClockLoader />}
      {data?.data?.length == 0 && <EmptyBox />}
    </div>
  );
}
