'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';
import AppHeader from './AppHeader';

interface Props {
  children: ReactNode;
}

export default function ExperimentAppLayout({ children }: Props) {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="pt-15"
      >
        {children}
      </motion.div>
    </div>
  );
}
