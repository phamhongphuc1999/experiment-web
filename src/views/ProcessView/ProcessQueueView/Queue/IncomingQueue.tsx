import { motion } from 'motion/react';
import ViewProcessItem from 'src/components/ProcessItem/ViewProcessItem';
import { ProcessType } from 'src/types/process.type';
import BaseQueue from './BaseQueue';

interface Props {
  incomingProcesses: ProcessType[];
}

export default function IncomingQueue({ incomingProcesses }: Props) {
  return (
    <BaseQueue title="Incoming" count={incomingProcesses.length}>
      {incomingProcesses.map((process) => (
        <motion.div
          key={process.pid}
          layoutId={process.pid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ViewProcessItem data={process} />
        </motion.div>
      ))}
      {incomingProcesses.length === 0 && (
        <p className="py-8 text-center text-sm text-gray-400">No incoming processes</p>
      )}
    </BaseQueue>
  );
}
