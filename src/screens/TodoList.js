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

    const { addTodoRequested } = this.props;

    // Check if the user has actually entered some text
    if (!this.inputElement.value.trim()) {
      console.log('Empty todos are not allowed!');
      return;
    }

    const key = Date.now();
    const text = this.inputElement.value;

    addTodoRequested(key, text);

    // Empty the input field and focus on it
    // to facilitate the adding of todos.
    this.inputElement.value = '';
    this.inputElement.focus();
  }

  toggleTodo(id) {
    const { toggleTodo } = this.props;
    toggleTodo(id);
  }

  removeTodo(id) {
    const { currentPage, currentTodos, changePage, removeTodo } = this.props;

    removeTodo(id);

    // Switch to the previous page when there are
    // no more todos left on the current one.
    if (currentPage !== 1 && currentTodos.length - 1 === 0) {
      changePage(currentPage - 1);
    }
  }

  changePage(e) {
    const { changePage } = this.props;

    if (typeof e !== 'undefined') {
      e.preventDefault();
    }

    // Make sure the value will be a number
    const pageNumber = Number(e.target.id);
    changePage(pageNumber);
  }

  // Take the user to the first page of the filtered list
  changePageOnFilter() {
    const { currentPage, changePage } = this.props;

    if (currentPage !== 1) {
      changePage(1);
    }
  }

  render() {
    const { isAddingTodo, currentTodos, pageNumbers, currentPage } = this.props;

    return (
      <section className="container">
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
                  {isAddingTodo ? 'Todo is loading...' : '+'}
                </Button>
              </form>
              <div style={{ marginBottom: '2rem' }}>
                <FilterButton filter="ALL" changePageOnFilter={this.changePageOnFilter}>
                  All
                </FilterButton>
                <FilterButton filter="ACTIVE" changePageOnFilter={this.changePageOnFilter}>
                  Active
                </FilterButton>
                <FilterButton filter="COMPLETED" changePageOnFilter={this.changePageOnFilter}>
                  Completed
                </FilterButton>
              </div>
            </div>
            <PaginatedList
              currentItems={currentTodos}
              handleClick1={this.toggleTodo}
              handleClick2={this.removeTodo}
            />
          </div>
          <Paginator
            pageNumbers={pageNumbers}
            currentPage={currentPage}
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

const mapDispatchToProps = dispatch => bindActionCreators(
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
