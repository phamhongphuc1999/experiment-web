import { AnimatePresence, motion } from 'framer-motion';
import ViewProcessItem from 'src/components/ProcessItem/ViewProcessItem';
import { useProcessStore } from 'src/states/process.state';
import { ProcessStatusType } from 'src/types/process.type';
import IncomingQueue from './IncomingQueue';
import ReadyQueue from './ReadyQueue';
import TerminatedQueue from './TerminatedQueue';

export default function ProcessQueueView() {
  const { processes } = useProcessStore();
  const processList = Object.values(processes);

  const runningProcess = processList.find((p) => p.state === ProcessStatusType.RUNNING);

  return (
    <div className="flex h-[calc(100vh-100px)] min-h-0 flex-col gap-4 p-4">
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/50 p-2 dark:border-blue-800 dark:bg-blue-950/20">
        <h2 className="mb-1 text-2xl font-bold text-blue-600 dark:text-blue-400">CPU (Running)</h2>
        <AnimatePresence mode="popLayout">
          {runningProcess ? (
            <motion.div
              key={runningProcess.pid}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="w-full max-w-md"
            >
              <ViewProcessItem data={runningProcess} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400 italic"
            >
              IDLE
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mb-2 grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-3">
        <IncomingQueue processList={processList} />
        <ReadyQueue processList={processList} />
        <TerminatedQueue processList={processList} />
      </div>
    </div>
  );
}
