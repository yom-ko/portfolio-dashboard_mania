import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'react-emotion';

const customPaginationLink = css`
  cursor: pointer;
`;

export const Paginator = ({ pageNumbers, currentPage, handlePageClick }) => {
  const pageItems = (() => {
    function createPageItem(number) {
      return (
        <li
          id={number}
          key={number}
          onClick={handlePageClick}
          onKeyDown={handlePageClick}
          tabIndex="0"
          role="button"
          className={cx(
            currentPage === number
              ? 'pagination-link is-current'
              : 'pagination-link',
            customPaginationLink
          )}
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
