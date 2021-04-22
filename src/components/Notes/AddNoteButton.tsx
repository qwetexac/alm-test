import React, { HTMLAttributes, memo } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 50px;
  height: 50px;
  position: absolute;
  z-index: 5000;
  outline: none;
  border: none;
  font-size: 36px;
  background: #61dafb;
  cursor: pointer;
  top: 0;
  left: 0;
`;
const AddNoteButton = memo<HTMLAttributes<HTMLButtonElement>>((props) => {
  return <Button {...props}>+</Button>;
});

export default AddNoteButton;
