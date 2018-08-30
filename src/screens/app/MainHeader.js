import React from 'react';
import { css } from 'react-emotion';

const mainHeaderStyle = css`
  background-color: #c93c67;
  .section {
    padding: 0;
  }
`;

const MainHeader = ({ children }) => (
  <div className={mainHeaderStyle}>
    <div className="section">{children}</div>
  </div>
);

export default MainHeader;
