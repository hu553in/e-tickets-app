import React from 'react';

const withParentComponent = (
  Component: React.FC,
  ParentComponent: React.FC<{ children: React.ReactNode | React.ReactNode[] }>
) => (
  <ParentComponent>
    <Component />
  </ParentComponent>
);

export default withParentComponent;
