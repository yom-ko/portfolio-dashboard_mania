import React from 'react';
import PropTypes from 'prop-types';

export const Paginator = ({ pageNumbers, currentPage, handlePageClick }) => {
  const pageItems = (() => {
    function createPageItem(number) {
      return (
        <li
          id={number}
          key={number}
          onClick={handlePageClick}
          onKeyDown={handlePageClick}
          className={currentPage === number ? 'pagination-link is-current' : 'pagination-link'}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex="0"
        >
          {number}
        </li>
      );
    }
    return pageNumbers.map(createPageItem);
  })();

  return (
    <div>
      <nav className="pagination" aria-label="pagination">
        <ul className="pagination-list">{pageItems}</ul>
      </nav>
    </div>
  );
};

Paginator.propTypes = {
  pageNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentPage: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired
};

export default Paginator;
