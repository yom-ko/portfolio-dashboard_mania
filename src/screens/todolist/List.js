import React from 'react';
import PropTypes from 'prop-types';

import Todo from 'screens/todolist/Todo';

export const List = ({ items, handleClick1, handleClick2 }) => {
  const listItems = items.map(item => (
    <Todo item={item} key={item[1].key} handleClick1={handleClick1} handleClick2={handleClick2} />
  ));

  return <ul>{listItems}</ul>;
};

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object]))
  ).isRequired,
  handleClick1: PropTypes.func.isRequired,
  handleClick2: PropTypes.func.isRequired
};

export default List;
