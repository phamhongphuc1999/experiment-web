'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { Toaster } from '../shadcn-ui/sonner';
import AppHeader from './AppHeader';
import EffectBox from './EffectBox';

interface Props {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: Props) {
  return (
    <EffectBox>
      <div className="min-h-screen">
        <AppHeader />
        <Toaster expand={true} position="top-right" richColors />
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="h-screen pt-15"
        >
          {children}
        </motion.div>
      </div>
    </EffectBox>
  );
}
