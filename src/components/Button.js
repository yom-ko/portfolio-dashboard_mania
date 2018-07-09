import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable no-unused-vars */
import { css, cx } from 'react-emotion';
/* eslint-enable */

export const Button = ({
  type,
  children,
  disabled,
  mod,
  modCss,
  handleClick
}) => (
  <button
    type={type}
    disabled={disabled}
    className={cx('button', mod)}
    css={modCss}
    onClick={handleClick}
  >
    {children}
  </button>
);

Button.defaultProps = {
  mod: 'is-info',
  type: 'button'
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  mod: PropTypes.string,
  type: PropTypes.string
};

export default Button;