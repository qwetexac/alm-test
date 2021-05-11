import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { INote } from './types';

const SelectionArea = styled.div<{ x: number; y: number }>`
	position: absolute;
  border: 1px dashed gray;
  top: ${({ y }) => y - 15}px;
  left: ${({ x }) => x - 15}px;
`;

type Props = {
  x: number;
  y: number;
  onCreate: (property: Partial<INote>) => void;
};

const NotesNewNote = memo<Props>(({ x, y, onCreate }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
  
    let width: number;
    let height: number;
    
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      width = Math.abs(x - e.pageX);
      height = Math.abs(y - e.pageY);
      ref.current.style.width = `${width}px`;
      ref.current.style.height = `${height}px`;
    };
    
    document.addEventListener('mousemove', move)
    
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', move)
      
      onCreate({ size: [width, height], transform: [x, y] })
    }, { once: true })
    
    return () => {
      document.removeEventListener('mousemove', move)
    }
  }, [x, y, onCreate])
  
  return (
    <SelectionArea ref={ref} x={x} y={y} />
  )
});

export default NotesNewNote;
