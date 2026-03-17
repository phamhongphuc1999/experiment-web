'use client';

import { Moon, Sun } from 'lucide-react';
import { useConfigStore } from 'src/states/config.state';
import IconButton from './IconButton';

export default function ThemeButton() {
  const { fn } = useConfigStore();

  return (
    <IconButton className="h-7.5 w-7.5" onClick={fn.setTheme}>
      <Sun className="size-5 dark:hidden" />
      <Moon className="hidden size-5 dark:block" />
    </IconButton>
  );
}
