import React from 'react';
/* eslint-disable no-unused-vars */
import { css, jsx } from '@emotion/core';
/* eslint-enable */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions } from 'modules/todolist';
import Button from 'components/Button';

const filterButtonStyles = css`
  margin-right: 0.5rem;
`;

export const FilterButton = ({ children, active, changeFilter, changePageOnFilter }) => (
  <Button
    type="button"
    disabled={active}
    mod="is-text"
    modCss={filterButtonStyles}
    handleClick={() => {
      changeFilter();
      changePageOnFilter();
    }}
  >
    {children}
  </Button>
);

FilterButton.defaultProps = {
  changePageOnFilter: () => {}
};

FilterButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  active: PropTypes.bool.isRequired,
  changeFilter: PropTypes.func.isRequired,
  changePageOnFilter: PropTypes.func
};

const mapStateToProps = ({ todolist }, ownPops) => ({
  active: ownPops.filter === todolist.todos.filter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeFilter: () => dispatch(actions.changeFilter(ownProps.filter))
});

// Connect the container component to Redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterButton);
