import React from 'react';
import { css } from 'react-emotion';

const loadingStyles = css`
  .spinner {
    display: block;
    width: 1rem;
    height: 100%;
    margin: 0 auto;
  }
`;

export const Loading = () => (
  <div className={loadingStyles}>
    <span className="spinner">Loading...</span>
  </div>
);

export default Loading;
