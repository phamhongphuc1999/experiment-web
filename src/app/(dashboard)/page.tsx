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
  const spotlight = features[0];
  const quickLinks = features.slice(0, 3);

  return (
    <div className="min-h-screen pb-24">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,146,60,0.15),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.14),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.12),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[40px_40px] opacity-40" />
        <motion.div
          animate={{ x: [0, 18, -12, 0], y: [0, -14, 10, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-15%] left-[-10%] h-[45%] w-[45%] rounded-full bg-orange-500/10 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -16, 12, 0], y: [0, 12, -8, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[-12%] bottom-[-15%] h-[45%] w-[45%] rounded-full bg-blue-500/10 blur-[140px]"
        />
      </div>

      <div className="container mx-auto px-4">
        <section className="pt-16 pb-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1 text-sm font-medium text-orange-400"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
                </span>
                Experiments Dashboard v1.1
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
                className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl"
              >
                Experiment{' '}
                <span className="bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Web
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16, ease: 'easeOut' }}
                className="text-muted-foreground mb-8 max-w-2xl text-lg leading-relaxed"
              >
                A high-performance playground for modern web experiments, interactive games, and
                architectural explorations built with the latest cutting-edge technologies.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.24, ease: 'easeOut' }}
                className="flex flex-wrap items-center gap-4"
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

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {['Games', 'Simulators', 'Security'].map((label, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.08, ease: 'easeOut' }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur"
                  >
                    <p className="text-xs tracking-widest text-orange-300/80 uppercase">{label}</p>
                    <p className="mt-2 text-2xl font-semibold text-white/90">
                      {label === 'Games' ? '4' : label === 'Simulators' ? '1' : '1'}
                    </p>
                    <p className="text-xs text-zinc-400">active modules</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs tracking-[0.3em] text-zinc-400 uppercase">Launch Pad</p>
                  <h2 className="mt-2 text-2xl font-bold">Spotlight Build</h2>
                </div>
                <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-300">
                  Featured
                </span>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/10 p-3">
                    {spotlight.icon}
                  </div>
                  <div>
                    <p className="text-xs tracking-widest text-zinc-400 uppercase">
                      {spotlight.stats}
                    </p>
                    <p className="text-lg font-semibold">{spotlight.title}</p>
                  </div>
                </div>
                <p className="text-sm text-zinc-300">{spotlight.description}</p>
                <Link
                  href={spotlight.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-300 transition-colors hover:text-orange-200"
                >
                  Launch Now <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6 space-y-3">
                {quickLinks.map((feature, index) => (
                  <motion.div
                    key={feature.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
                  >
                    <span className="font-semibold text-zinc-100">{feature.title}</span>
                    <Link
                      href={feature.href}
                      className="text-xs tracking-widest text-orange-300 uppercase hover:text-orange-200"
                    >
                      Open
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mb-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur"
            >
              <h3 className="text-2xl font-bold tracking-tight">Mission Control</h3>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Experiment Web is a sandbox environment designed to push the boundaries of
                contemporary web development. Each project serves as a focused study on specific
                domains like real-time state synchronization, complex game logic, systems
                visualization, and secure data handling.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Built with a safety-first approach using TypeScript and a focus on UX through fluid
                animations and responsive design patterns.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="rounded-3xl border border-orange-500/20 bg-linear-to-br from-orange-500/10 via-black/30 to-transparent p-7"
            >
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight">
                <Code2 className="h-5 w-5 text-orange-500" /> Technology Foundation
              </h3>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs font-semibold text-zinc-200"
                  >
                    {tech.icon}
                    {tech.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Experiment Atlas</h2>
              <span className="text-xs tracking-[0.3em] text-zinc-400 uppercase">
                {features.length} modules
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.href}
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.04, ease: 'easeOut' }}
                  whileHover={{ y: -6, scale: 1.01 }}
                >
                  <Link
                    href={feature.href}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 ${feature.borderHover} hover:shadow-2xl hover:shadow-orange-500/10`}
                  >
                    <div
                      className={`absolute top-0 right-0 -mt-16 -mr-16 h-28 w-28 rounded-full bg-linear-to-br ${feature.gradient} opacity-60 blur-3xl transition-opacity group-hover:opacity-100`}
                    />

                    <div className="relative z-10 mb-4 flex items-start justify-between">
                      <div className="rounded-xl border border-white/10 bg-white/10 p-3 transition-all duration-300 group-hover:scale-110">
                        {feature.icon}
                      </div>
                      <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-bold tracking-wider text-zinc-300 uppercase transition-colors group-hover:text-orange-200">
                        {feature.stats}
                      </span>
                    </div>

                    <div className="relative z-10 mt-auto">
                      <h3 className="mb-2 text-lg font-bold tracking-tight uppercase transition-colors group-hover:text-orange-300">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 line-clamp-2 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-orange-300/80 uppercase transition-colors group-hover:text-orange-200">
                        Enter Application{' '}
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
