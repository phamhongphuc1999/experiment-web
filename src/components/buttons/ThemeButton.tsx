'use client';

import { Moon, Sun1 } from 'iconsax-reactjs';
import { switchTheme } from 'src/services';
import IconButton from './IconButton';

export default function ThemeButton() {
  return (
    <IconButton className="h-[30px] w-[30px]" onClick={switchTheme}>
      <Sun1 className="size-5 dark:hidden" />
      <Moon className="hidden size-5 dark:block" />
    </IconButton>
  );
}
