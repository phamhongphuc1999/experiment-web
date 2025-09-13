'use client';

import { useMemo } from 'react';
import { cn } from 'src/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './shadcn-ui/pagination';

interface Props {
  currentPage: number;
  totalPages: number;
  events?: {
    onPageChange?: (page: number) => void;
  };
  className?: string;
}

export default function AppPagination({ currentPage, totalPages, events, className }: Props) {
  const pages = useMemo(() => {
    const delta = 2;
    const range: Array<number | string> = [];
    const rangeWithDots: Array<number | string> = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    if (currentPage - delta > 2) rangeWithDots.push(1, '...');
    else rangeWithDots.push(1);
    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) rangeWithDots.push('...', totalPages);
    else if (totalPages > 1) rangeWithDots.push(totalPages);
    return rangeWithDots;
  }, [currentPage, totalPages]);

  function onPageChange(page: number) {
    if (events?.onPageChange) events.onPageChange(page);
  }

  function onPrev() {
    if (currentPage > 1 && events?.onPageChange) events.onPageChange(currentPage - 1);
  }

  function onNext() {
    if (currentPage < totalPages && events?.onPageChange) events.onPageChange(currentPage + 1);
  }

  return (
    <Pagination className={cn('mt-2', className)}>
      <PaginationContent>
        <PaginationItem onClick={onPrev}>
          <PaginationPrevious />
        </PaginationItem>
        {pages.map((page) => {
          if (typeof page === 'number')
            return (
              <PaginationItem
                onClick={() => onPageChange(page)}
                key={page}
                className={cn('cursor-pointer rounded-md', page == currentPage && 'bg-secondary')}
              >
                <PaginationLink>{page}</PaginationLink>
              </PaginationItem>
            );
          else
            return (
              <PaginationItem key={page}>
                <PaginationEllipsis />
              </PaginationItem>
            );
        })}
        <PaginationItem onClick={onNext}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
