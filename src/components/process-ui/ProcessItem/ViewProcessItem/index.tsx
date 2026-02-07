import { Clock, Timer1 } from 'iconsax-reactjs';
import { motion } from 'motion/react';
import { ComponentProps } from 'react';
import AppTooltip from 'src/components/AppTooltip';
import CopyClipboard from 'src/components/CopyClipboard';
import ProcessStatus from 'src/components/process-ui/ProcessStatus';
import { cn } from 'src/lib/utils';
import { formatText } from 'src/services';
import { ProcessStatusType, ProcessType } from 'src/types/process.type';
import BlockTaskList from './BlockTaskList';

interface Props {
  data: ProcessType;
  metadata?: {
    onlyShowCurrentBlockTask?: boolean;
  };
  props?: ComponentProps<'div'>;
}

export default function ViewProcessItem({ data, metadata, props }: Props) {
  const progress = (data.runtime / data.executionTime) * 100;

  return (
    <div
      {...props}
      className={cn('group relative overflow-hidden border p-2 transition-all hover:shadow-lg', {
        'border-blue-300 bg-blue-100/50 dark:border-blue-700/60 dark:bg-blue-900/40':
          data.state == ProcessStatusType.NEW,
        'border-yellow-300 bg-yellow-100/50 dark:border-yellow-700/60 dark:bg-yellow-900/40':
          data.state == ProcessStatusType.READY,
        'border-green-300 bg-green-100/50 dark:border-green-700/60 dark:bg-green-900/40':
          data.state == ProcessStatusType.RUNNING,
        'border-orange-300 bg-orange-100/50 dark:border-orange-700/60 dark:bg-orange-900/40':
          data.state == ProcessStatusType.WAITING,
        'border-gray-300 bg-gray-100/50 dark:border-gray-700/60 dark:bg-gray-800/60':
          data.state == ProcessStatusType.TERMINATED,
      })}
    >
      {/* Background Decor */}
      <div className="absolute -top-5 -right-5 h-16 w-16 opacity-10 transition-transform group-hover:scale-110">
        <Timer1 size={64} variant="Bold" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <AppTooltip tooltipContent={data.pid}>
              <span className="text-sm font-bold tracking-tight">
                #{data.index ? `${data.index}.` : ''}
                {formatText(data.pid, 4)}
              </span>
            </AppTooltip>
            <CopyClipboard copyText={data.pid} iconprops={{ size: 14 }} />
          </div>
          <div className="text-muted-foreground flex items-center gap-1 text-[10px]">
            <Clock size={10} />
            <span>Arrived at T+{data.arrivalTime}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2 items-center justify-center">
            {data.state === ProcessStatusType.NEW && (
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="h-full w-full bg-blue-500"
              />
            )}
            {data.state === ProcessStatusType.READY && (
              <motion.span
                animate={{ y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="h-full w-full bg-yellow-500"
              />
            )}
            {data.state === ProcessStatusType.RUNNING && (
              <>
                <span className="absolute h-full w-full animate-ping bg-green-400 opacity-75" />
                <span className="relative h-full w-full bg-green-500" />
              </>
            )}
            {data.state === ProcessStatusType.WAITING && (
              <motion.span
                animate={{ scale: [1, 0.6, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="h-full w-full bg-orange-500"
              />
            )}
            {data.state === ProcessStatusType.TERMINATED && (
              <span className="h-full w-full bg-gray-400" />
            )}
          </div>
          <ProcessStatus state={data.state} rootprops={{ className: 'text-sm' }} />
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {/* Main Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">Execution Progress</span>
            <span className="font-bold">
              {data.runtime}/{data.executionTime}ms
            </span>
          </div>
          <div className="h-2 overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div
              className={cn('h-full transition-all duration-500', {
                'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]':
                  data.state == ProcessStatusType.NEW,
                'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]':
                  data.state == ProcessStatusType.READY,
                'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]':
                  data.state == ProcessStatusType.RUNNING,
                'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]':
                  data.state == ProcessStatusType.WAITING,
                'bg-gray-400': data.state == ProcessStatusType.TERMINATED,
              })}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {data.blockTasks && data.blockTasks.length > 0 && (
          <BlockTaskList
            onlyShowCurrentBlockTask={metadata?.onlyShowCurrentBlockTask}
            data={data.blockTasks}
            currentBlockTaskIndex={data.currentBlockTaskIndex}
          />
        )}
      </div>
    </div>
  );
}
