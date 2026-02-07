import { motion } from 'motion/react';
import ViewProcessItem from 'src/components/process-ui/ProcessItem/ViewProcessItem';
import { ProcessStatusType, ProcessType } from 'src/types/process.type';
import BaseQueue from './BaseQueue';

interface Props {
  processList: ProcessType[];
}

export default function TerminatedQueue({ processList }: Props) {
  const terminatedProcesses = processList
    .filter((p) => p.state === ProcessStatusType.TERMINATED)
    .sort((a, b) => b.arrivalTime - a.arrivalTime); // Show recent first?

  return (
    <BaseQueue title="Terminated" count={terminatedProcesses.length}>
      {terminatedProcesses.map((process) => (
        <motion.div
          key={process.pid}
          layoutId={process.pid}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <ViewProcessItem data={process} />
        </motion.div>
      ))}
      {terminatedProcesses.length === 0 && (
        <p className="py-8 text-center text-sm text-gray-400">No terminated processes</p>
      )}
    </BaseQueue>
  );
}
