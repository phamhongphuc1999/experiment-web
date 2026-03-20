import { ReactNode } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { cn } from 'src/lib/utils';
import { Form } from '../shadcn-ui/form';

interface Props<T extends FieldValues> {
  headerTitle?: string;
  title: string;
  description?: ReactNode;
  form: UseFormReturn<T>;
  className?: string;
  children?: ReactNode;
}

export default function BaseAuthorForm<T extends FieldValues>(params: Props<T>) {
  const { headerTitle = 'PApp', title, description, form, className, children } = params;

  return (
    <div className="bg-background flex justify-center pt-[10vh]">
      <div
        className={cn(
          'border-special bg-popover box-border w-md rounded-3xl border p-4',
          className
        )}
      >
        <p className="text-special text-lg font-semibold">{headerTitle}</p>
        <p className="mt-4 text-2xl font-bold text-white">{title}</p>
        {typeof description == 'string' ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : (
          <>{description}</>
        )}
        <Form {...form}>
          <div className="mt-6">{children}</div>
        </Form>
      </div>
    </div>
  );
}
