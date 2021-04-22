import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { INote } from '../types';

const Editor = styled.div`
  position: relative;
  display: inline-block;
  padding: 20px;
  box-sizing: border-box;
  outline: none;
  max-width: 100%;
  word-break: break-all;

  &:empty:before {
    content: 'Place some text here';
    opacity: 0.3;
  }
`;

type Props = {
  containerMinSize: number;
  text: string;
  onSave: (p: Pick<INote, 'text'>) => void;
};

const NoteTextEditor = memo<Props>(({ text, containerMinSize, onSave }) => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClick = useCallback(() => {
    setActive(true);

    document.addEventListener(
      'mousedown',
      (e) => {
        if (e.currentTarget !== ref.current) {
          setActive(false);
          onSave({ text: ref.current?.innerHTML || '' });
        }
      },
      { once: true }
    );
  }, [onSave]);

  useEffect(() => {
    active && ref.current?.focus();
  }, [active]);

  return (
    <Editor
      ref={ref}
      onClick={handleClick}
      contentEditable={active}
      suppressContentEditableWarning
      style={{ fontSize: containerMinSize / 5 }}
    >
      {text}
    </Editor>
  );
});

export default NoteTextEditor;
