import { Activity, Cpu, ReceiptText } from 'iconsax-reactjs';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import ViewProcessItem from 'src/components/process-ui/ProcessItem/ViewProcessItem';
import { cn } from 'src/lib/utils';
import { useProcessStore } from 'src/states/process.state';
import { ProcessHistoryEnum, ProcessHistoryType, ProcessType } from 'src/types/process.type';

interface HistoryItemProps {
  data: ProcessHistoryType;
}

function HistoryItem({ data }: HistoryItemProps) {
  const isAction = data.actionType === ProcessHistoryEnum.ACTION;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="group flex items-start gap-2 border-l border-white/5 py-1 pl-3 transition-colors hover:bg-white/5"
    >
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-blue-500/50 group-hover:bg-blue-400" />
      <div className="flex flex-1 flex-col text-[11px] leading-relaxed">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={cn('font-bold tracking-tight', {
                'text-blue-400': isAction,
                'text-purple-400': !isAction,
              })}
            >
              {data.actionType.toUpperCase()}
            </span>
            {data.eventType && (
              <span className="bg-white/10 px-1 text-[9px] text-zinc-400">{data.eventType}</span>
            )}
          </div>
          <span className="font-mono text-[10px] text-zinc-500 opacity-50">
            T+{data.timeInterval}
          </span>
        </div>
        <span className="font-mono text-zinc-300">{data.stateType}</span>
      </div>
    </motion.div>
  );
}

interface Props {
  runningProcess: ProcessType | undefined;
}

export default function RunningScreen({ runningProcess }: Props) {
  const { history, mode } = useProcessStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="flex h-55 w-full gap-1 overflow-hidden">
      {/* CPU CORE SECTION */}
      <div className="relative flex flex-1 flex-col overflow-hidden border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-3 py-2 dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex h-4 items-center gap-2">
            <Cpu size={16} className="text-blue-500" variant="Bold" />
            <h2 className="text-[12px] font-bold tracking-tight uppercase">
              Processor Core | {mode}
            </h2>
          </div>
          {runningProcess && (
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-medium text-green-600 dark:text-green-400">
                ACTIVE
              </span>
            </div>
          )}
        </div>

        <div className="relative flex flex-1 items-center justify-center p-4">
          <AnimatePresence mode="popLayout">
            {runningProcess ? (
              <motion.div
                key={runningProcess.pid}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="w-full max-w-sm"
              >
                <ViewProcessItem
                  data={runningProcess}
                  metadata={{ onlyShowCurrentBlockTask: true }}
                  props={{
                    className:
                      'border-none bg-transparent dark:bg-transparent shadow-none hover:shadow-none p-0',
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-2 text-zinc-400"
              >
                <Activity size={32} className="opacity-20" />
                <span className="text-xs font-medium tracking-widest uppercase opacity-50">
                  Core Idle
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Background Grid Pattern */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-40 dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]" />
        </div>
      </div>
      {/* HISTORY TERMINAL SECTION */}
      {history.length > 0 && (
        <div className="flex w-1/3 flex-col overflow-hidden bg-zinc-900 shadow-2xl ring-1 ring-white/10">
          <div className="flex items-center gap-2 border-b border-white/5 bg-zinc-800/50 px-3 py-2">
            <ReceiptText size={14} className="text-zinc-400" />
            <span className="h-4 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
              System Log
            </span>
          </div>

          <div
            ref={scrollRef}
            className="scroll-hidden flex-1 overflow-x-hidden overflow-y-auto p-2"
          >
            <div className="flex flex-col gap-1">
              <AnimatePresence initial={false}>
                {history.map((item, idx) => (
                  <HistoryItem key={`${item.stateType}-${idx}`} data={item} />
                ))}
              </AnimatePresence>
              {history.length === 0 && (
                <div className="flex h-full items-center justify-center py-10 text-zinc-600">
                  <span className="font-mono text-[10px]">waiting for events...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
