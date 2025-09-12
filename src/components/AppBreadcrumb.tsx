import Link from 'next/link';
import { Fragment } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './shadcn-ui/breadcrumb';

interface Props {
  items: Array<{ title?: string; href?: string }>;
}

export default function AppBreadcrumb({ items }: Props) {
  const len = items.length;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          return (
            <Fragment key={item.title || index}>
              <BreadcrumbItem>
                {item.href ? (
                  <Link href={item.href}>{item.title}</Link>
                ) : (
                  <BreadcrumbPage>{item.title}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < len - 1 && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
