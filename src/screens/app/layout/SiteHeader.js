import React from 'react';
/* eslint-disable no-unused-vars */
import { css, jsx } from '@emotion/core';
/* eslint-enable */

const siteHeaderStyles = css`
  background-color: #c93c67;
  .section {
    padding: 0;
  }
`;

const SiteHeader = ({ children }) => (
  <div css={siteHeaderStyles}>
    <div className="section">{children}</div>
  </div>
);

export default SiteHeader;
