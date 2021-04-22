import React, { memo, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';

import { useDrag, useResize, useDelete } from '../hooks';
import ColorPicker from './ColorPicker';
import TextEditor from './TextEditor';
import LayerController from './LayerController';
import { INote } from '../types';

type WrapperProps = {
  isAboutToDelete: boolean;
};

type Props = INote & {
  active: boolean;
  isOnTopOfLayer: boolean;

  onMoveNoteToTop: (id: number) => void;
  onDelete: (id: number) => void;
  onHover: (id: number) => void;
  onSave: (id: number, property: Partial<INote>) => void;
};

const Wrapper = styled.div<Pick<Props, 'active'>>`
  position: absolute;
	${({ active }) => active && css`
		will-change: transform;
	`}
`;

const Body = styled.div<WrapperProps>`
  resize: both;
  box-shadow: 0 3px 5px 1px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  overflow: auto;
	${({ isAboutToDelete }) => isAboutToDelete && css`
		opacity: 0.5;
	`}
`;

const Note = memo<Props>(
  ({
    onHover,
    active,
    onDelete,
    onMoveNoteToTop,
    isOnTopOfLayer,
    onSave,
    ...props
  }) => {
    const handleSave = useCallback(
      (properties: Partial<INote>) => {
        onSave(props.id, properties);
      },
      [props.id, onSave]
    );

    const handleDelete = useCallback(() => {
      onDelete(props.id);
    }, [props.id, onDelete]);

    const handleLayerButtonClick = useCallback(() => {
      onMoveNoteToTop(props.id);
    }, [props.id, onMoveNoteToTop]);

    const note = useRef<HTMLDivElement | null>(null);
    const onDragStart = useDrag(handleSave);
    const onResizeStart = useResize(handleSave);
    const saveColorTimer = useRef<number>();
    const isAboutToDelete = useDelete(note, handleDelete);

    const handleMouseDown = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onHover(props.id);
        const target = e.currentTarget;
        const offsets = target.getBoundingClientRect();

        // check if mouse is on bottom-right side of note
        if (
          offsets.width + offsets.left - e.pageX < 20 &&
          offsets.height + offsets.top - e.pageY < 20
        ) {
          onResizeStart();
          return;
        }

        onDragStart(e);
      },
      [onHover, onDragStart]
    );

    const handleChangeColor = useCallback((color) => {
        if (!note.current) return;

        note.current.style.background = color;

        clearTimeout(saveColorTimer.current);
        saveColorTimer.current = window.setTimeout(handleSave, 300, { color });
      }, [handleSave]);

    const [left, top] = props.transform;
    const [width, height] = props.size;

    return (
      <Wrapper
        style={{
          transform: `translate(${left}px, ${top}px)`,
          zIndex: props.zIndex,
        }}
        onMouseDown={handleMouseDown}
        active={active}
      >
        <Body
          style={{ width, height, background: props.color }}
          ref={note}
          isAboutToDelete={isAboutToDelete}
        >
          {active && (
            <>
              <ColorPicker
                color={props.color}
                onChangeColor={handleChangeColor}
              />
              {!isOnTopOfLayer && (
                <LayerController onClick={handleLayerButtonClick} />
              )}
            </>
          )}

          <TextEditor
            text={props.text}
            containerMinSize={Math.min(width, height)}
            onSave={handleSave}
          />
        </Body>
      </Wrapper>
    );
  }
);

export default Note;
