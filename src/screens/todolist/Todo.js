import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ item, handleClick1, handleClick2 }) => (
  <li>
    <span
      onClick={() => handleClick1(item[0])}
      onKeyDown={() => handleClick1(item[0])}
      style={item[1].completed ? { textDecoration: 'line-through' } : {}}
    >
      {item[1].text}
    </span>
    <span
      className="delete"
      onClick={() => handleClick2(item[0])}
      onKeyDown={() => handleClick2(item[0])}
      role="button"
      tabIndex="0"
    />
  </li>
);

Todo.propTypes = {
  item: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ).isRequired,
  handleClick1: PropTypes.func.isRequired,
  handleClick2: PropTypes.func.isRequired
};

export default Todo;
