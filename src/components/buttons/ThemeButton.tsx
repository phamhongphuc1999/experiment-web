'use client';

import { Moon, Sun1 } from 'iconsax-reactjs';
import IconButton from './IconButton';
import { useConfigStore } from 'src/states/config.state';

export default function ThemeButton() {
  const { setTheme } = useConfigStore();

  return (
    <IconButton className="h-7.5 w-7.5" onClick={setTheme}>
      <Sun1 className="size-5 dark:hidden" />
      <Moon className="hidden size-5 dark:block" />
    </IconButton>
  );
}
