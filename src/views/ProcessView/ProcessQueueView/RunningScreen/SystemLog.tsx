import { ReceiptText } from 'iconsax-reactjs';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { cn } from 'src/lib/utils';
import { useProcessStore } from 'src/states/process.state';
import { ProcessHistoryEnum, ProcessHistoryType } from 'src/types/process.type';

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

export default function SystemLog() {
  const { history } = useProcessStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  if (history.length == 0) return null;

  return (
    <div className="flex w-1/3 flex-col overflow-hidden bg-zinc-900 shadow-2xl ring-1 ring-white/10">
      <div className="flex items-center gap-2 border-b border-white/5 bg-zinc-800/50 px-3 py-2">
        <ReceiptText size={14} className="text-zinc-400" />
        <span className="h-4 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
          System Log
        </span>
      </div>
      <div ref={scrollRef} className="scroll-hidden flex-1 overflow-x-hidden overflow-y-auto p-2">
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
  );
}
