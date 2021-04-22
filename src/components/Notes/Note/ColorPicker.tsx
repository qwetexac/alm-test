import React, { memo, useCallback } from 'react';
import styled from 'styled-components';

const Sample = styled.label`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: inherit;
  position: absolute;
  right: -40px;

  & + input {
    visibility: hidden;
    position: absolute;
  }
`;

type Props = {
  color: string;
  onChangeColor: (color: string) => void;
};

const NoteColorPicker = memo<Props>(({ color, onChangeColor }) => {
  const handleChange = useCallback((e) => {
    onChangeColor(e.target.value);
  }, [onChangeColor]);
  
  return (
    <>
      <Sample htmlFor="color-picker" />
      <input
        id="color-picker"
        type="color"
        value={color}
        onChange={handleChange}
      />
    </>
  );
});

export default NoteColorPicker;
