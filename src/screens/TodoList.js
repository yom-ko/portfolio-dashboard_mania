import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { css, cx } from 'react-emotion';

import { actions, getCurrentTodos, getPageNumbers } from 'modules/todolist';

import Button from 'components/Button';
import PaginatedList from 'screens/todolist/PaginatedList';
import Paginator from 'screens/todolist/Paginator';
import FilterButton from 'screens/todolist/FilterButton';

const customBox = css`
  min-height: 600px;
  .todosWrapper {
    height: 500px;
  }
  .form-input {
    width: 13.5rem;
    margin-right: 0.5rem;
    margin-bottom: 20px;
  }
  .form-submit {
    margin-bottom: 10px;
  }
`;

// Container component
class Todolist extends Component {
  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.changePage = this.changePage.bind(this);
    this.changePageOnFilter = this.changePageOnFilter.bind(this);
  }

  addTodo(e) {
    e.preventDefault();

    // Check if the user has actually entered some text
    if (!this.inputElement.value.trim()) {
      console.log('Empty todos are not allowed!');
      return;
    }

    const key = Date.now();
    const text = this.inputElement.value;

    this.props.addTodoRequested(key, text);

    // Empty the input field and focus on it
    // to facilitate the adding of todos.
    this.inputElement.value = '';
    this.inputElement.focus();
  }

  toggleTodo(id) {
    this.props.toggleTodo(id);
  }

  removeTodo(id) {
    this.props.removeTodo(id);

    // Switch to the previous page when there are
    // no more todos left on the current one.
    if (
      this.props.currentPage !== 1 &&
      this.props.currentTodos.length - 1 === 0
    ) {
      this.props.changePage(this.props.currentPage - 1);
    }
  }

  changePage(e) {
    if (typeof e !== 'undefined') {
      e.preventDefault();
    }

    // Make sure the value will be a number
    const pageNumber = Number(e.target.id);
    this.props.changePage(pageNumber);
  }

  // Take the user to the first page of the filtered list
  changePageOnFilter() {
    if (this.props.currentPage !== 1) {
      this.props.changePage(1);
    }
  }

  render() {
    return (
      <section className="section">
        <div className={cx('box', customBox)}>
          <div className="todosWrapper">
            <div>
              <form onSubmit={this.addTodo}>
                <input
                  type="text"
                  className="input form-input"
                  placeholder="Enter a todo"
                  ref={el => (this.inputElement = el)}
                />
                <Button type="submit form-submit">
                  {this.props.isAddingTodo ? 'Todo is loading...' : '+'}
                </Button>
              </form>
              <div style={{ marginBottom: '2rem' }}>
                <FilterButton
                  filter="ALL"
                  changePageOnFilter={this.changePageOnFilter}
                >
                  All
                </FilterButton>
                <FilterButton
                  filter="ACTIVE"
                  changePageOnFilter={this.changePageOnFilter}
                >
                  Active
                </FilterButton>
                <FilterButton
                  filter="COMPLETED"
                  changePageOnFilter={this.changePageOnFilter}
                >
                  Completed
                </FilterButton>
              </div>
            </div>
            <PaginatedList
              currentItems={this.props.currentTodos}
              handleClick1={this.toggleTodo}
              handleClick2={this.removeTodo}
            />
          </div>
          <Paginator
            pageNumbers={this.props.pageNumbers}
            currentPage={this.props.currentPage}
            handlePageClick={this.changePage}
          />
        </div>
      </section>
    );
  }
}

Todolist.propTypes = {
  currentTodos: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object]))
  ).isRequired,
  currentPage: PropTypes.number.isRequired,
  addTodoRequested: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired
};

// Map state and dispatch() to the component props
const mapStateToProps = ({ todolist }) => ({
  currentTodos: getCurrentTodos(todolist),
  pageNumbers: getPageNumbers(todolist),
  isAddingTodo: todolist.todos.isAddingTodo,
  currentPage: todolist.pagination.currentPage
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addTodoRequested: actions.addTodoRequested,
      toggleTodo: actions.toggleTodo,
      removeTodo: actions.removeTodo,
      changePage: actions.changePage
    },
    dispatch
  );

// Connect the container component to Redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todolist);
