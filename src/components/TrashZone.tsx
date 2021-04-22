import React from 'react';
import styled from 'styled-components';

const TrashWrap = styled.div`
  padding: 25px;
  position: relative;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background: repeating-linear-gradient(
    -55deg,
    #222,
    #222 10px,
    #333 10px,
    #333 20px
  );
`;

const TrashZone: React.FC = ({ children }) => (
  <TrashWrap>
    {children}
  </TrashWrap>
);

export default TrashZone;
