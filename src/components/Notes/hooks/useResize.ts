import { useCallback } from 'react';
import { INote } from '../types';

export const useResize = (onFinish: (s: Pick<INote, 'size'>) => void) => {
  return useCallback(() => {
    document.addEventListener(
      'mouseup',
      (e) => {
        if (!e.target) return;
        const contentRect = (e.target as HTMLDivElement).getBoundingClientRect();

        onFinish({
          size: [contentRect.width, contentRect.height],
        });
      },
      { once: true }
    );
  }, [onFinish]);
};
