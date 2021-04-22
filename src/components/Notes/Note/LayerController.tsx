import React, { memo } from 'react';
import styled from 'styled-components';

const Button = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: lightblue;
  position: absolute;
  right: -40px;
  top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
`;

type Props = {
  onClick: () => void;
};

const NoteLayerController = memo<Props>(({ onClick }) => (
  <Button onClick={onClick} title="Move to top">
    Move Top
  </Button>
));

export default NoteLayerController;
