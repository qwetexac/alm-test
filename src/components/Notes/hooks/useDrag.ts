import React, { useCallback } from 'react';
import { INote } from '../types';

export const useDrag = (onFinish: (o: Pick<INote, 'transform'>) => void) => {
  return useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const target = event.currentTarget;
      const offsets = target.getBoundingClientRect();
      const offsetTop = offsets.top;
      const offsetLeft = offsets.left;
      const shiftX = event.pageX - offsetLeft + 25;
      const shiftY = event.pageY - offsetTop + 25;

      let currentLeft: number;
      let currentTop: number;

      const move = (e: MouseEvent) => {
        currentLeft = e.pageX - shiftX;
        currentTop = e.pageY - shiftY;
        target.style.transform = `translate(${currentLeft}px, ${currentTop}px)`;
      };

      document.addEventListener('mousemove', move);

      document.addEventListener(
        'mouseup',
        () => {
          document.removeEventListener('mousemove', move);
          currentLeft &&
            currentTop &&
            onFinish({ transform: [currentLeft, currentTop] });
        },
        { once: true }
      );
    },
    [onFinish]
  );
};
