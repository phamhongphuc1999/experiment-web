'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import CommonContainer from 'src/components/box/CommonContainer';

export default function Home() {
  const features = [
    {
      title: 'Caro (Tic-Tac-Toe)',
      description:
        'Classic strategy game with multiple modes: offline, online multiplayer, and blind mode',
      href: '/caro',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Connect4',
      description: 'Drop discs and connect four in a row to win',
      href: '/connect4',
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      title: 'Pikachu',
      description: 'Match pairs of tiles with various board transformations',
      href: '/pikachu',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'Bingo',
      description: 'Modern bingo',
      href: '/bingo',
      gradient: 'from-green-500 to-teal-500',
    },
    {
      title: 'Weather',
      description: 'Get detailed weather forecasts with customizable parameters',
      href: '/weather',
      gradient: 'from-cyan-500 to-blue-500',
    },
  ];

  return (
    <CommonContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl"
      >
        <div className="mb-12 text-center">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="mb-4 text-4xl font-bold md:text-5xl"
          >
            Welcome to Experiment Web
          </motion.h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            A collection of interactive games, utilities, and experiments built with Next.js and
            TypeScript
          </p>
          <div className="mt-6">
            <Link
              href="https://peter-present.xyz/"
              target="_blank"
              className="text-orange-400 underline transition-colors hover:text-orange-500"
            >
              View my portfolio →
            </Link>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={feature.href}
                className="group bg-card/40 hover:border-primary/50 relative block h-full overflow-hidden rounded-xl border p-6 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                />
                <div className="relative z-10">
                  <h2 className="text-xl font-bold tracking-tight">{feature.title}</h2>
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-orange-400">
                    <span className="transition-transform group-hover:translate-x-1">Explore</span>
                    <span className="transition-transform group-hover:translate-x-2">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-card/30 mt-12 mb-8 rounded-xl border p-8 backdrop-blur-sm"
        >
          <h3 className="mb-4 text-xl font-bold">About This Project</h3>
          <p className="text-muted-foreground text-base leading-relaxed">
            {
              'This is a personal experimental project showcasing various web technologies and interactive features. Built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Zustand for state management. All games support both offline and online multiplayer modes.'
            }
          </p>
        </motion.div>
      </motion.div>
    </CommonContainer>
  );
}
