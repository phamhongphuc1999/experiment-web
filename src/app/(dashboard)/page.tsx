'use client';

import {
  ChevronRight,
  Code2,
  Cpu,
  ExternalLink,
  Gamepad2,
  Grid3X3,
  Lock,
  Monitor,
  Puzzle,
  Wallet,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { GithubIcon } from 'src/components/icons';

const features = [
  {
    title: 'Caro (Tic-Tac-Toe)',
    description:
      'Classic strategy game with multiple modes: offline, online multiplayer, and blind mode.',
    href: '/caro',
    gradient: 'from-orange-500/20 to-red-500/20',
    borderHover: 'group-hover:border-orange-500/50',
    icon: <Gamepad2 className="h-6 w-6 text-orange-400" />,
    stats: 'Multiplayer',
  },
  {
    title: 'Connect4',
    description:
      'Drop discs and connect four in a row to win in this classic gravity-based board game.',
    href: '/connect4',
    gradient: 'from-blue-500/20 to-purple-500/20',
    borderHover: 'group-hover:border-blue-500/50',
    icon: <Grid3X3 className="h-6 w-6 text-blue-400" />,
    stats: 'Local / AI',
  },
  {
    title: 'Pikachu',
    description: 'Match pairs of tiles with various board transformations and challenging puzzles.',
    href: '/pikachu',
    gradient: 'from-yellow-500/20 to-orange-500/20',
    borderHover: 'group-hover:border-yellow-500/50',
    icon: <Puzzle className="h-6 w-6 text-yellow-400" />,
    stats: 'Logic',
  },
  {
    title: 'Process Demo',
    description: 'Interactive visualization of operating system process scheduling algorithms.',
    href: '/process',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    borderHover: 'group-hover:border-emerald-500/50',
    icon: <Cpu className="h-6 w-6 text-emerald-400" />,
    stats: 'Simulation',
  },
  {
    title: 'Web3 Wallet',
    description:
      'Direct interaction with Solana and EVM blockchains using standard wallet providers.',
    href: '/web3-wallet',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    borderHover: 'group-hover:border-cyan-500/50',
    icon: <Wallet className="h-6 w-6 text-cyan-400" />,
    stats: 'Blockchain',
  },
  {
    title: 'Crypt',
    description:
      'Modern, secure encryption and decryption utility using industry-standard algorithms.',
    href: '/encrypt',
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderHover: 'group-hover:border-purple-500/50',
    icon: <Lock className="h-6 w-6 text-purple-400" />,
    stats: 'Security',
  },
];

const techStack = [
  { name: 'Next.js 16', icon: <Monitor className="h-5 w-5" /> },
  { name: 'React 19', icon: <Zap className="h-5 w-5" /> },
  { name: 'TypeScript', icon: <Code2 className="h-5 w-5" /> },
  { name: 'Tailwind CSS', icon: <Grid3X3 className="h-5 w-5" /> },
  { name: 'Motion', icon: <Zap className="h-5 w-5" /> },
  { name: 'Zustand', icon: <Cpu className="h-5 w-5" /> },
];

export default function Home() {
  return (
    <div className="min-h-screen pb-20">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1 text-sm font-medium text-orange-400"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
            </span>
            Experiments Dashboard v1.1
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl"
          >
            Experiment{' '}
            <span className="bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Web
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-muted-foreground mx-auto mb-10 max-w-3xl text-xl leading-relaxed"
          >
            A high-performance playground for modern web experiments, interactive games, and
            architectural explorations built with the latest cutting-edge technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="https://peter-present.xyz/"
              target="_blank"
              className="flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 active:scale-95"
            >
              My Portfolio <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href="https://github.com/phamhongphuc1999/experiment-web"
              target="_blank"
              className="bg-card/50 border-border hover:bg-card flex items-center gap-2 rounded-full border px-6 py-3 font-semibold backdrop-blur-sm transition-all hover:border-orange-500/30 active:scale-95"
            >
              <GithubIcon className="h-4 w-4" /> View Source
            </Link>
          </motion.div>
        </section>

        {/* Featured Section */}
        <section className="mb-20">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Featured Experiments</h2>
            <div className="from-border mx-8 hidden h-px grow bg-linear-to-r to-transparent md:block" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.4 }}
              >
                <Link
                  href={feature.href}
                  className={`group bg-card/30 relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 ${feature.borderHover} hover:shadow-2xl hover:shadow-orange-500/5`}
                >
                  <div
                    className={`absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-linear-to-br ${feature.gradient} opacity-50 blur-3xl transition-opacity group-hover:opacity-100`}
                  />

                  <div className="relative z-10 mb-4 flex items-start justify-between">
                    <div className="bg-background/50 border-border/50 group-hover:bg-background/80 rounded-xl border p-3 transition-all duration-300 group-hover:scale-110">
                      {feature.icon}
                    </div>
                    <span className="bg-background/50 border-border/50 text-muted-foreground group-hover:text-foreground rounded border px-2 py-1 text-[10px] font-bold tracking-wider uppercase transition-colors">
                      {feature.stats}
                    </span>
                  </div>

                  <div className="relative z-10 mt-auto">
                    <h3 className="mb-2 text-xl font-bold tracking-tight uppercase transition-colors group-hover:text-orange-400">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 line-clamp-2 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold text-orange-400/80 uppercase transition-colors group-hover:text-orange-400">
                      Enter Application{' '}
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Stack & About */}
        <div className="grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="bg-card/20 rounded-2xl border p-8 backdrop-blur-sm lg:col-span-3"
          >
            <h3 className="mb-4 text-2xl font-bold tracking-tight">About The Mission</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Experiment Web is a sandbox environment designed to push the boundaries of
              contemporary web development. Each project serves as a focused study on specific
              domains like real-time state synchronization, complex game logic, systems
              visualization, and secure data handling.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Built with a safety-first approach using TypeScript and a focus on UX through fluid
              animations and responsive design patterns.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
            className="rounded-2xl border border-orange-500/20 bg-linear-to-br from-orange-500/10 to-transparent p-8 backdrop-blur-sm lg:col-span-2"
          >
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold tracking-tight">
              <Code2 className="h-5 w-5 text-orange-500" /> Technology Foundation
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="bg-background/40 border-border/30 group flex items-center gap-2 rounded-lg border p-2 transition-colors hover:border-orange-500/30"
                >
                  <div className="text-muted-foreground transition-colors group-hover:text-orange-400">
                    {tech.icon}
                  </div>
                  <span className="text-xs font-semibold">{tech.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
