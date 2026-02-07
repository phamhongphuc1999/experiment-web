import { AnimatePresence, motion } from 'motion/react';
import ViewProcessItem from 'src/components/ProcessItem/ViewProcessItem';
import { ProcessStatusType, ProcessType } from 'src/types/process.type';
import BaseQueue from './BaseQueue';

interface Props {
  processList: ProcessType[];
}

export default function WaitingQueue({ processList }: Props) {
  const waitingProcesses = processList
    .filter((p) => p.state === ProcessStatusType.WAITING)
    .sort((a, b) => a.arrivalTime - b.arrivalTime);

  return (
    <BaseQueue title="Waiting" count={waitingProcesses.length}>
      <AnimatePresence mode="popLayout">
        {waitingProcesses.map((process) => (
          <motion.div
            key={process.pid}
            layoutId={process.pid}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ViewProcessItem data={process} />
          </motion.div>
        ))}
        {waitingProcesses.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">No waiting processes</p>
        )}
      </AnimatePresence>
    </BaseQueue>
  );
}
