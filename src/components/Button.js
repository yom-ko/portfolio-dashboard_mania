import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable no-unused-vars */
import { css, jsx } from '@emotion/core';
/* eslint-enable */

export const Button = ({ type, children, disabled, mod, modCss, handleClick }) => (
  <button
    type={type}
    disabled={disabled}
    className={`button ${mod}`}
    css={modCss}
    onClick={handleClick}
  >
    {children}
  </button>
);

Button.defaultProps = {
  type: 'button',
  mod: 'is-info'
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  mod: PropTypes.string
};

export default Button;
