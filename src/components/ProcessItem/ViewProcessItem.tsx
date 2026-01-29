'use client';

import { ComponentProps } from 'react';
import AppTooltip from 'src/components/AppTooltip';
import CopyClipboard from 'src/components/CopyClipboard';
import ProcessStatus from 'src/components/process-ui/ProcessStatus';
import { cn } from 'src/lib/utils';
import { formatText } from 'src/services';
import { ProcessStatusType, ProcessType } from 'src/types/process-demo.type';

interface Props {
  data: ProcessType;
  props?: ComponentProps<'div'>;
}

export default function ViewProcessItem({ data, props }: Props) {
  return (
    <div
      {...props}
      className={cn('mt-2 rounded-lg border p-3', {
        'bg-blue-100 dark:bg-blue-900/40': data.state == ProcessStatusType.NEW,
        'bg-yellow-100 dark:bg-yellow-900/40': data.state == ProcessStatusType.READY,
        'bg-green-100 dark:bg-green-900/40': data.state == ProcessStatusType.RUNNING,
        'bg-orange-100 dark:bg-orange-900/40': data.state == ProcessStatusType.WAITING,
        'bg-gray-100 dark:bg-gray-800': data.state == ProcessStatusType.TERMINATED,
      })}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <AppTooltip tooltipContent={data.pid}>
            <span className="text-sm font-medium">PID: {formatText(data.pid, 3)}</span>
          </AppTooltip>
          <CopyClipboard copyText={data.pid} iconprops={{ size: 16 }} />
        </div>
        <ProcessStatus state={data.state} />
      </div>
      <p>
        Remaining time:{' '}
        <span className={cn('font-semibold', data.remainingTime > 0 && 'text-green-600')}>
          {data.remainingTime}
        </span>
        /{data.executionTime}, arrival from {data.arrivalTime}
      </p>
    </div>
  );
}
