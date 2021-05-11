import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { INote } from './types';

const SelectionArea = styled.div<{ x: number; y: number }>`
	position: absolute;
  border: 1px dashed gray;
  top: 50px;
  left: 50px;
`;

type Props = {
  x: number;
  y: number;
  onSave: (id: number, property: Partial<INote>) => void;
};

const NotesNewNote = memo<Props>(({ x, y }) => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    document.addEventListener('mousemove', e => {
    
    })
  })
  
  return (
    <SelectionArea ref={ref} x={x} y={y} />
  )
});

export default NotesNewNote;
