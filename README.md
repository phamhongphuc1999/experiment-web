# Experiment Web

A personal experimental playground showcasing modern web technologies, web3 integration, and interactive games. Built with **Next.js 16**, **React 19**, and optimized for performance and UX.

## 🚀 Features

### 🎮 Games
- **Caro (Tic-Tac-Toe)**: A robust implementation of the classic game with multiple modes.
- **Connect4**: Strategy game requiring players to connect four discs vertically, horizontally, or diagonally.
- **Pikachu**: A tile-matching puzzle game with dynamic board transformations.

### 🛠 Utilities
- **Web3 Wallet**: Full-featured Web3 integration using Reown AppKit, supporting multiple chains (Solana, EVM).
- **Crypt**: A secure tool for text encryption and decryption powered by `crypto-js`.

## 💻 Tech Stack

This project leverages a cutting-edge stack to ensure speed, type safety, and developer experience.

### Core
- **Runtime**: [Bun](https://bun.sh)
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Library**: [React 19](https://react.dev/)

### State & Logic
- **Global State**: [Zustand](https://github.com/pmndrs/zustand)
- **State Machines**: [XState](https://stately.ai/) (for complex game logic)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)

### UI & Styling
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Motion](https://motion.dev/) (formerly Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/), Iconsax

### Web3
- **Kit**: [Reown AppKit](https://reown.com/)
- **Hooks**: [Wagmi](https://wagmi.sh/)
- **Core**: [Viem](https://viem.sh/)
- **Adapters**: Solana & Wagmi adapters

### Quality & Tooling
- **Test Runner**: [Vitest](https://vitest.dev/)
- **Linting**: Eslint, Prettier, Commitlint
- **Hooks**: Husky

## 📂 Project Structure

```bash
src/
├── app/            # Next.js App Router pages
├── components/     # Reusable UI components
├── configs/        # App-wide configurations
├── context/        # React Context providers
├── hooks/          # Custom React hooks
├── services/       # API and business logic services
├── state-machine/  # XState machine definitions
├── states/         # Zustand stores
├── styles/         # Global styles
├── types/          # TypeScript definitions
├── views/          # Feature-specific view components
└── web3/           # Web3 wallet configuration
```

## 🛠 Getting Started

### Prerequisites

Ensure you have [Bun](https://bun.sh/) installed:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd experiment-web
bun install
```

### Development

Start the development server:

```bash
bun dev
```

Open [http://localhost:3011](http://localhost:3011) to view the app.

### Production Build

To build and start the application for production:

```bash
bun run build
bun start
```

## 🐳 Docker Support

To run the application using Docker:

```bash
docker-compose up --build -d
```

## 🧪 Testing

Run strict unit and integration tests:

```bash
bun test              # Run tests once
bun test:ui           # Run tests with UI interface
bun test:coverage     # Generate coverage report
```

## 📜 Deployment

The project is hosted at: [https://experiment.peter-present.xyz/](https://experiment.peter-present.xyz/)
