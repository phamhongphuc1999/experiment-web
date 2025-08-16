'use client';

import { useEffect } from 'react';
import { LS } from 'src/configs/constance';
import { LocalStorage } from 'src/services';

export default function EffectBox() {
  useEffect(() => {
    const theme = LocalStorage.get(LS.THEME) || 'dark';
    LocalStorage.set(LS.THEME, theme);
    document.body.dataset.theme = theme;
    if (theme == 'dark') document.documentElement.classList.toggle('dark');
    else document.documentElement.classList.remove('dark');
  }, []);

  return <></>;
}
