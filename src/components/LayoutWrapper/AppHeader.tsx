import Link from 'next/link';
import ThemeButton from '../buttons/ThemeButton';

export default function AppHeader() {
  return (
    <header className="border-b-border bg-background/60 fixed top-0 h-15 w-full border-b backdrop-blur-md transition-all duration-300">
      <div className="container flex h-full items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <span className="hidden text-xl font-bold tracking-tight sm:block">Experiment Web</span>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeButton />
        </div>
      </div>
    </header>
  );
}
