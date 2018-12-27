import React from 'react';
/* eslint-disable no-unused-vars */
import { css, jsx } from '@emotion/core';
/* eslint-enable */

const loadingStyles = css`
  .spinner {
    display: block;
    width: 1rem;
    height: 100%;
    margin: 0 auto;
  }
`;

export const Loading = () => (
  <div css={loadingStyles}>
    <span className="spinner">Loading...</span>
  </div>
);

export default Loading;
