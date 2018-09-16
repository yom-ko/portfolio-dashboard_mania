import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

const todoStyles = css`
  width: 17.3rem;
  margin-bottom: 15px;
  padding: 15px;
  color: #333;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid #dfdfdf;
  border-radius: 5px;

  span:hover {
    cursor: pointer;
  }

  span:first-child {
    display: inline-block;
    width: 90%;
    float: left;
    margin-right: 0;
  }
`;

export const Todo = ({ item, handleClick1, handleClick2 }) => (
  <li className={todoStyles}>
    <span
      onClick={() => handleClick1(item[0])}
      onKeyDown={() => handleClick1(item[0])}
      style={item[1].completed ? { textDecoration: 'line-through' } : {}}
    >
      {item[1].text}
    </span>
    <span
      role="button"
      tabIndex="0"
      className="delete"
      onClick={() => handleClick2(item[0])}
      onKeyDown={() => handleClick2(item[0])}
    />
  </li>
);

Todo.propTypes = {
  item: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired,
  handleClick1: PropTypes.func.isRequired,
  handleClick2: PropTypes.func.isRequired
};

export default Todo;
