import { Activity, Cpu } from 'iconsax-reactjs';
import { AnimatePresence, motion } from 'motion/react';
import ViewProcessItem from 'src/components/process-ui/ProcessItem/ViewProcessItem';
import { useProcessStore } from 'src/states/process.state';
import { ProcessType } from 'src/types/process.type';
import ExportImportData from './ExportImportData';
import SystemLog from './SystemLog';

interface Props {
  runningProcess: ProcessType | undefined;
}

export default function RunningScreen({ runningProcess }: Props) {
  const { mode } = useProcessStore();

  return (
    <div className="flex h-55 w-full gap-1 overflow-hidden">
      <div className="relative flex flex-1 flex-col overflow-hidden border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-3 py-2 dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex h-4 items-center gap-2">
            <Cpu size={16} className="text-blue-500" variant="Bold" />
            <h2 className="text-[12px] font-bold tracking-tight uppercase">
              Processor Core | {mode}
            </h2>
          </div>
          <div className="flex items-center gap-2">
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
            <ExportImportData />
          </div>
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
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-40 dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]" />
        </div>
      </div>
      <SystemLog />
    </div>
  );
}
