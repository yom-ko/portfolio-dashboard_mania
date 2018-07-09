import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

import Todo from 'screens/todolist/Todo';

const customList = css`
  li {
    width: 16.4rem;
    color: #333;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 15px;
    margin-bottom: 15px;
    border: 1px solid #dfdfdf;
    border-radius: 5px;
  }

  li > span:first-child {
    display: inline-block;
    padding: 0px 10px 0px 0px;
    margin-right: 0;
    width: 90%;
    float: left;
  }

  li span:hover {
    cursor: pointer;
  }
`;

export const PaginatedList = ({ currentItems, handleClick1, handleClick2 }) => {
  const listItems = (() => {
    function createListItem(item) {
      return (
        <Todo
          item={item}
          key={item[1].key}
          handleClick1={handleClick1}
          handleClick2={handleClick2}
        />
      );
    }
    return currentItems.map(createListItem);
  })();

  return <ul className={customList}>{listItems}</ul>;
};

PaginatedList.propTypes = {
  currentItems: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object]))
  ).isRequired,
  handleClick1: PropTypes.func.isRequired,
  handleClick2: PropTypes.func.isRequired
};

export default PaginatedList;
