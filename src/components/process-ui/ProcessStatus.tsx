import { cn } from 'src/lib/utils';
import { ProcessStatusType } from 'src/types/process.type';

interface Props {
  state: ProcessStatusType;
}

export default function ProcessStatus({ state }: Props) {
  return (
    <span
      className={cn('text-sm font-semibold uppercase', {
        'text-blue-800 dark:text-blue-200': state == ProcessStatusType.NEW,
        'text-yellow-800 dark:text-yellow-200': state == ProcessStatusType.READY,
        'text-green-800 dark:text-green-200': state == ProcessStatusType.RUNNING,
        'text-orange-800 dark:text-orange-200': state == ProcessStatusType.WAITING,
        'text-gray-800 dark:text-gray-300': state == ProcessStatusType.TERMINATED,
      })}
    >
      {state}
    </span>
  );
}
