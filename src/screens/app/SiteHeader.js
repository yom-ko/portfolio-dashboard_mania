import React from 'react';
import { css } from 'react-emotion';

const siteHeaderStyles = css`
  background-color: #c93c67;
  .section {
    padding: 0;
  }
`;

const SiteHeader = ({ children }) => (
  <div className={siteHeaderStyles}>
    <div className="section">{children}</div>
  </div>
);

export default SiteHeader;
