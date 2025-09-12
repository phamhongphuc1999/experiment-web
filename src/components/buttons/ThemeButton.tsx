'use client';

import { Moon, Sun1 } from 'iconsax-reactjs';
import IconButton from './IconButton';
import { useConfigStore } from 'src/states/config.state';

export default function ThemeButton() {
  const { setTheme } = useConfigStore();

  return (
    <IconButton className="h-[30px] w-[30px]" onClick={setTheme}>
      <Sun1 className="size-5 dark:hidden" />
      <Moon className="hidden size-5 dark:block" />
    </IconButton>
  );
}
