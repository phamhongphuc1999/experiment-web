# Experiment Web - Advanced Playground

A sophisticated experimental playground showcasing high-performance web engineering, complex state management, and real-time visualization. Built with a premium stack featuring **Next.js 16**, **React 19**, and **XState 5**.

## 🖥️ Process Management System

A robust simulation of a modern operating system's process scheduling and execution environment.

- **MLFQ Scheduler**: Robust implementation of a **Multi-Level Feedback Queue** algorithm with dynamic priority aging and preemption.
- **CPU Core Dashboard**: Real-time visual monitoring of CPU cores, showing active process execution, idle states, and core utilization metrics.
- **System Terminal Log**: Animated, auto-scrolling terminal capturing the full history of process state transitions and execution events.
- **Process Lifecycle**: Full simulation of process states: `NEW` ➔ `READY` ➔ `RUNNING` ➔ `WAITING` ➔ `TERMINATED`.

## 🎮 Experimental Games

High-quality game implementations focusing on complex logic and interactive user experiences.

- **Caro (Tic-Tac-Toe)**: A feature-rich implementation with multiple competitive modes and optimized game-state management.
- **Connect4**: Tactical strategy game featuring a sophisticated win-detection engine and smooth piece-drop animations.
- **Pikachu**: Dynamic tile-matching puzzle system with complex board transformations and pathfinding logic.

## 🛠️ Modern Utilities & Web3

Cutting-edge tools and integrations for the decentralized and secure web.

- **Web3 Ecosystem**: Seamless wallet integration across Solana and EVM chains using the **Reown AppKit** (formerly WalletConnect).
- **Security Tools (Crypt)**: Professional-grade text encryption and decryption utility powered by `crypto-js`.

---

## 💻 Technical Excellence

This project leverages a cutting-edge stack to ensure speed, type safety, and a premium developer experience.

### Core Architecture

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Logic**: [XState 5](https://stately.ai/) (Complex state orchestration)
- **State**: [Zustand](https://github.com/pmndrs/zustand) (Global state)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

### UI & Aesthetics

- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide](https://lucide.dev/) & Iconsax

---

## 📂 Project Structure

```bash
src/
├── app/            # Next.js App Router (Pages & API)
├── components/     # Reusable UI system & Design tokens
├── state-machine/  # XState machine definitions (Scheduler & Games)
├── views/          # Feature-specific dashboards and views
├── states/         # Zustand global stores
├── hooks/          # Custom hooks for real-time state & logic
└── types/          # Strict TypeScript definitions
```

## 🛠 Getting Started

### Prerequisites

Ensure you have [Bun](https://bun.sh/) installed:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Installation & Development

```bash
git clone <repository-url>
cd experiment-web
bun install
bun dev
```

Open [http://localhost:3011](http://localhost:3011) to view the playground.

## 📜 Deployment

The project is live at: [https://experiment.peter-present.xyz/](https://experiment.peter-present.xyz/)
