import { AnimatePresence, motion } from 'motion/react';
import ViewProcessItem from 'src/components/ProcessItem/ViewProcessItem';
import { ProcessStatusType, ProcessType } from 'src/types/process.type';
import BaseQueue from './BaseQueue';

interface Props {
  processList: ProcessType[];
}

export default function ReadyQueue({ processList }: Props) {
  const readyProcesses = processList
    .filter((p) => p.state === ProcessStatusType.READY)
    .sort((a, b) => a.arrivalTime - b.arrivalTime);

  return (
    <BaseQueue title="Ready" count={readyProcesses.length}>
      <AnimatePresence mode="popLayout">
        {readyProcesses.map((process) => (
          <motion.div
            key={process.pid}
            layoutId={process.pid}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ViewProcessItem data={process} />
          </motion.div>
        ))}
        {readyProcesses.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">Queue is empty</p>
        )}
      </AnimatePresence>
    </BaseQueue>
  );
}
