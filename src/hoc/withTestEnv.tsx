import React from 'react';
import { MemoryRouter } from 'react-router-dom';

const withTestEnv = (ChildComponent: React.FC) => (
  <MemoryRouter>
    <ChildComponent />
  </MemoryRouter>
);

export default withTestEnv;
