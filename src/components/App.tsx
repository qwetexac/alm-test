import React from 'react';
import { createGlobalStyle } from 'styled-components';

import Notes from './Notes';
import TrashZone from './TrashZone';

const GlobalStyles = createGlobalStyle`
  body {
    overflow: hidden;
    margin: 0;
    padding: 0;
    font-family: Roboto, sans-serif;
  }
`;

const App = () =>  (
  <>
    <GlobalStyles />
    <TrashZone>
      <Notes />
    </TrashZone>
  </>
);

export default App;
