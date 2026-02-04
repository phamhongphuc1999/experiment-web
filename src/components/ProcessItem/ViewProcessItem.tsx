import { Clock, Timer1 } from 'iconsax-reactjs';
import { ComponentProps } from 'react';
import AppTooltip from 'src/components/AppTooltip';
import CopyClipboard from 'src/components/CopyClipboard';
import ProcessStatus from 'src/components/process-ui/ProcessStatus';
import { cn } from 'src/lib/utils';
import { formatText } from 'src/services';
import { ProcessStatusType, ProcessType } from 'src/types/process.type';

interface Props {
  data: ProcessType;
  props?: ComponentProps<'div'>;
}

export default function ViewProcessItem({ data, props }: Props) {
  const progress = ((data.executionTime - data.remainingTime) / data.executionTime) * 100;

  return (
    <div
      {...props}
      className={cn(
        'group relative mt-3 overflow-hidden rounded-xl border-2 p-4 transition-all hover:shadow-lg',
        {
          'border-blue-200 bg-blue-50/30 dark:border-blue-900/50 dark:bg-blue-950/20':
            data.state == ProcessStatusType.NEW,
          'border-yellow-200 bg-yellow-50/30 dark:border-yellow-900/50 dark:bg-yellow-950/20':
            data.state == ProcessStatusType.READY,
          'border-green-200 bg-green-50/30 dark:border-green-900/50 dark:bg-green-950/20':
            data.state == ProcessStatusType.RUNNING,
          'border-orange-200 bg-orange-50/30 dark:border-orange-900/50 dark:bg-orange-950/20':
            data.state == ProcessStatusType.WAITING,
          'border-gray-200 bg-gray-50/30 dark:border-gray-800 dark:bg-gray-900/40':
            data.state == ProcessStatusType.TERMINATED,
        }
      )}
    >
      {/* Background Decor */}
      <div className="absolute -top-4 -right-4 h-16 w-16 opacity-10 transition-transform group-hover:scale-110">
        <Timer1 size={64} variant="Bold" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/50 shadow-sm dark:bg-gray-800/50">
            <span className="text-xs font-bold text-gray-500">P</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <AppTooltip tooltipContent={data.pid}>
                <span className="text-sm font-bold tracking-tight">#{formatText(data.pid, 4)}</span>
              </AppTooltip>
              <CopyClipboard copyText={data.pid} iconprops={{ size: 14 }} />
            </div>
            <div className="text-muted-foreground flex items-center gap-1 text-[10px]">
              <Clock size={10} />
              <span>Arrived at T+{data.arrivalTime}</span>
            </div>
          </div>
        </div>
        <ProcessStatus state={data.state} />
      </div>

      <div className="mt-4 space-y-3">
        {/* Main Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">Execution Progress</span>
            <span className="font-bold">
              {data.executionTime - data.remainingTime}/{data.executionTime}ms
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
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

        {/* Block Tasks Section */}
        {(data.blockTasks || []).length > 0 && (
          <div className="rounded-lg bg-black/5 p-2 dark:bg-white/5">
            <p className="text-muted-foreground mb-2 flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase">
              <Timer1 size={12} variant="Outline" />
              Blocked Tasks ({data.blockTasks?.length})
            </p>
            <div className="space-y-2">
              {data.blockTasks!.map((item, index) => {
                const subProgress =
                  ((item.executionTime - item.remainingTime) / item.executionTime) * 100;
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-muted-foreground">Task #{index + 1}</span>
                      <span className="font-medium">
                        T+{item.arrivalTime} ({item.executionTime}ms)
                      </span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-full bg-orange-400 transition-all duration-300"
                        style={{ width: `${subProgress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
