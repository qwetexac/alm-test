import React, { memo, useCallback } from 'react';
import styled from 'styled-components';

import { INote } from '../types';

const Editor = styled.textarea`
  position: relative;
  display: inline-block;
  padding: 20px;
  box-sizing: border-box;
  outline: none;
  max-width: 100%;
  word-break: break-all;
  resize: none;
  height: 100%;
  background: none;

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
  const handleChange = useCallback((e: React.SyntheticEvent<HTMLTextAreaElement, Event>) => {
    onSave({ text: (e.target as HTMLTextAreaElement).value });
  }, [onSave])

  return (
    <Editor
      suppressContentEditableWarning
      style={{ fontSize: containerMinSize / 5 }}
      onChange={handleChange}
      value={text}
    />
  );
});

export default NoteTextEditor;
