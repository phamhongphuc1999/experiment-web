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
  const isTerminated = data.state === ProcessStatusType.TERMINATED;

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
      {/* Header Info */}
      <div className="flex items-start justify-between gap-1">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <AppTooltip tooltipContent={data.pid}>
              <span className="text-sm font-bold tracking-tight">
                #{data.index ? `${data.index}.` : ''}
                {formatText(data.pid, 3)}
              </span>
            </AppTooltip>
            <CopyClipboard
              copyText={data.pid}
              iconprops={{ size: 12, className: 'opacity-50 hover:opacity-100 transition-opacity' }}
            />
            <div>
              {data.readyPriority >= 0 && data.state == ProcessStatusType.READY && (
                <span className="rounded-xs bg-yellow-500/10 px-1.5 py-0.5 text-[9px] font-black tracking-wider text-yellow-600 uppercase dark:text-yellow-400">
                  P{data.readyPriority}
                </span>
              )}
              {data.waitingPriority >= 0 && data.state == ProcessStatusType.WAITING && (
                <span className="rounded-xs bg-orange-500/10 px-1.5 py-0.5 text-[9px] font-black tracking-wider text-orange-600 uppercase dark:text-orange-400">
                  P{data.waitingPriority}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-muted-foreground flex items-center gap-1.5 text-[10px] font-medium tracking-wide">
              <Clock size={11} strokeWidth={2.5} />
              <span>Arrived at T+{data.arrivalTime}</span>
            </div>
            {isTerminated && data.endAt >= 0 && (
              <div className="text-muted-foreground flex items-center gap-1.5 text-[10px] font-bold dark:text-green-400/80">
                <Timer1 size={11} variant="Bold" />
                <span>Finished at T+{data.endAt}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2 items-center justify-center">
              {data.state === ProcessStatusType.NEW && (
                <motion.span
                  animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="h-full w-full rounded-full bg-blue-500"
                />
              )}
              {data.state === ProcessStatusType.READY && (
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="h-full w-full rounded-full bg-yellow-500"
                />
              )}
              {data.state === ProcessStatusType.RUNNING && (
                <>
                  <span className="absolute h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative h-full w-full rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                </>
              )}
              {data.state === ProcessStatusType.WAITING && (
                <motion.span
                  animate={{ scale: [1, 0.6, 1], rotate: [0, 90, 180] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                  className="h-full w-full rounded-full bg-orange-500"
                />
              )}
              {isTerminated && (
                <span className="bg-muted-foreground/40 h-full w-full rounded-full" />
              )}
            </div>
            <ProcessStatus
              state={data.state}
              rootprops={{ className: 'text-[10px] font-black uppercase tracking-widest' }}
            />
          </div>
        </div>
      </div>

      {/* Progress & Tasks */}
      <div className="space-y-1.5">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold tracking-wider uppercase">
            <span className="text-muted-foreground/70">Execution</span>
            <span className={cn(isTerminated ? 'text-muted-foreground' : 'text-primary')}>
              {data.runtime}/{data.executionTime}ms
            </span>
          </div>
          <div className="bg-muted/20 h-1.5 overflow-hidden rounded-full">
            <motion.div
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
              className={cn('h-full', {
                'bg-blue-500': data.state == ProcessStatusType.NEW,
                'bg-yellow-500': data.state == ProcessStatusType.READY,
                'bg-green-500': data.state == ProcessStatusType.RUNNING,
                'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.3)]':
                  data.state == ProcessStatusType.WAITING,
                'bg-muted-foreground/40': isTerminated,
              })}
            />
          </div>
        </div>

        {data.blockTasks && data.blockTasks.length > 0 && (
          <div className="border-muted/50 border-t border-dashed pt-1">
            <BlockTaskList
              onlyShowCurrentBlockTask={metadata?.onlyShowCurrentBlockTask}
              data={data.blockTasks}
              currentBlockTaskIndex={data.currentBlockTaskIndex}
            />
          </div>
        )}
      </div>
    </div>
  );
}
