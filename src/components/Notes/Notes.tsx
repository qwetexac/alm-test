import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Note from './Note';
import NewNote from './NewNote';
import { NODE_LIST } from './contants';
import { useStore } from 'hooks';
import { INote } from './types';

const Wrapper = styled.div`
  position: relative;
  background: white;
  width: 100%;
  height: 100%;
`;

const newNote: INote = {
  text: '',
  id: 1,
  color: '#0075ab',
  zIndex: 1,
  size: [200, 200] as const,
  transform: [300, 300] as const,
};

const Notes = memo(() => {
  const [activeNote, setActiveNote] = useState<null | number>(null);
  const [newNoteState, setNewNote] = useState<null | { x: number; y: number }>(null);
  const [notesFromStore, setNotes] = useStore<INote[]>('notes', []);
  const notes = useRef<INote[]>(notesFromStore);
  const highestIndex = useRef<number>(1);

  if (notesFromStore !== notes.current) {
    notes.current = notesFromStore as INote[];
  }

  useEffect(() => {
    notes.current.forEach(({ zIndex }) => {
      highestIndex.current = Math.max(zIndex, highestIndex.current);
    });
  }, []);

  const handleSave = useCallback((id, noteProps) => {
    const nextNotes = notes.current.map((note) =>
      note.id !== id ? note : { ...note, ...noteProps }
    );
    setNotes(nextNotes);
  }, []);

  const handleDelete = useCallback((id) => {
    const nextNotes = notes.current.filter((note) => note.id !== id);
    setNotes(nextNotes);
  }, []);

  const handleCreateNote = useCallback((properties: Partial<INote>) => {
    highestIndex.current += 1;
    const nextNote = {
      ...newNote,
      ...properties,
      id: performance.now(),
      zIndex: highestIndex.current,
    };
    setNotes([...notes.current, nextNote]);
    setNewNote(null);
    setActiveNote(nextNote.id);
  }, []);

  const handleMoveNoteToTop = useCallback((id) => {
    highestIndex.current += 1;
    handleSave(id, { zIndex: highestIndex.current });
  }, []);
  
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target !== e.currentTarget) return;
    setNewNote({ x: e.pageX, y: e.pageY })
  }, [])

  return (
    <Wrapper id={NODE_LIST} onMouseDownCapture={handleMouseDown}>
      {newNoteState !== null && (
        <NewNote {...newNoteState} onCreate={handleCreateNote} />
      )}
      {notes.current.map((note) => (
        <Note
          key={note.id}
          {...note}
          transform={note.transform}
          active={activeNote === note.id}
          onHover={setActiveNote}
          onMoveNoteToTop={handleMoveNoteToTop}
          onSave={handleSave}
          onDelete={handleDelete}
          isOnTopOfLayer={highestIndex.current === note.zIndex}
        />
      ))}
    </Wrapper>
  );
});

export default Notes;
