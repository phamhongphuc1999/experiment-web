'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'iconsax-reactjs';
import { ComponentProps, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AppTooltip from 'src/components/AppTooltip';
import CopyClipboard from 'src/components/CopyClipboard';
import BaseInput from 'src/components/input/BaseInput';
import ProcessStatus from 'src/components/process-ui/ProcessStatus';
import { Form, FormField, FormItemContent } from 'src/components/shadcn-ui/form';
import { formatText } from 'src/services';
import { ProcessType } from 'src/types/process.type';
import z from 'zod';

const schema = z.object({
  arrivalTime: z.number().min(1, 'Must be at least 1'),
  executionTime: z.number().min(1, 'Must be at least 1').max(60, 'Must be at most 60'),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  data: ProcessType;
  events?: {
    onArrivalTimeChange?: (arrivalTime: number) => void;
    onExecutionTimeChange?: (executionTime: number) => void;
    onDelete?: (pid: string) => void;
  };
  props?: ComponentProps<'div'>;
}

export default function ChangeProcessItem({ data, events, props }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { arrivalTime: data.arrivalTime, executionTime: data.executionTime },
  });

  useEffect(() => {
    form.reset({
      arrivalTime: data.arrivalTime,
      executionTime: data.executionTime,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.arrivalTime, data.executionTime]);

  function onDelete(pid: string) {
    events?.onDelete?.(pid);
  }

  return (
    <div {...props} className="mt-2 rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <AppTooltip tooltipContent={data.pid}>
            <span className="text-xs font-medium">PID: {formatText(data.pid, 3)}</span>
          </AppTooltip>
          <CopyClipboard copyText={data.pid} iconprops={{ size: 16 }} />
        </div>
        <div className="flex items-center gap-1">
          <ProcessStatus state={data.state} />
          <Trash size={14} className="cursor-pointer" onClick={() => onDelete(data.pid)} />
        </div>
      </div>
      <Form {...form}>
        <form className="mt-2">
          <FormField
            control={form.control}
            name="arrivalTime"
            render={({ field }) => (
              <FormItemContent
                itemprops={{ className: 'flex items-center gap-4 space-y-0' }}
                labelprops={{ className: 'shrink-0', children: 'Arrival Time' }}
              >
                <BaseInput
                  type="number"
                  {...field}
                  onChange={(e) => {
                    const val = e.target.value === '' ? '' : Number(e.target.value);
                    field.onChange(val);
                    if (typeof val === 'number' && !isNaN(val)) {
                      events?.onArrivalTimeChange?.(val);
                    }
                  }}
                />
              </FormItemContent>
            )}
          />
          <FormField
            control={form.control}
            name="executionTime"
            render={({ field }) => (
              <FormItemContent
                itemprops={{ className: 'flex items-center gap-4 space-y-0 mt-2' }}
                labelprops={{ className: 'shrink-0', children: 'Execution Time' }}
              >
                <BaseInput
                  type="number"
                  {...field}
                  onChange={(e) => {
                    const val = e.target.value === '' ? '' : Number(e.target.value);
                    field.onChange(val);
                    if (typeof val === 'number' && !isNaN(val)) {
                      events?.onExecutionTimeChange?.(val);
                    }
                  }}
                />
              </FormItemContent>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
