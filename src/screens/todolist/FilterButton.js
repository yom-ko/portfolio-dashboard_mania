import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from 'modules/todolist';

import Button from 'components/Button';

const customButton = `
  margin-right: 10px;
`;

export const FilterButton = ({ children, active, changeFilter, changePageOnFilter }) => (
  <Button
    type="button"
    disabled={active}
    mod="is-text"
    modCss={customButton}
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
  active: PropTypes.PropTypes.bool.isRequired,
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
