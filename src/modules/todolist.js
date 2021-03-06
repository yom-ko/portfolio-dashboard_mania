import { combineReducers } from 'redux';

// Actions
export const actions = {
  // Action types
  ADD_TODO_REQUESTED: '@todolist/ADD_TODO_REQUESTED',
  ADD_TODO: '@todolist/ADD_TODO',
  TOGGLE_TODO: '@todolist/TOGGLE_TODO',
  REMOVE_TODO: '@todolist/REMOVE_TODO',
  CHANGE_FILTER: '@todolist/CHANGE_FILTER',
  CHANGE_PAGE: '@todolist/CHANGE_PAGE',

  // Action creators
  addTodoRequested(key, text) {
    return {
      type: actions.ADD_TODO_REQUESTED,
      payload: { key, text }
    };
  },

  nextId: 0,
  addTodo(action) {
    return {
      type: actions.ADD_TODO,
      payload: {
        id: (actions.nextId += 1),
        key: action.payload.key,
        text: action.payload.text
      }
    };
  },

  toggleTodo(id) {
    return {
      type: actions.TOGGLE_TODO,
      payload: {
        id
      }
    };
  },

  removeTodo(id) {
    return {
      type: actions.REMOVE_TODO,
      payload: {
        id
      }
    };
  },

  changeFilter(filter) {
    return {
      type: actions.CHANGE_FILTER,
      payload: {
        filter
      }
    };
  },

  changePage(pageNumber) {
    return {
      type: actions.CHANGE_PAGE,
      payload: {
        pageNumber
      }
    };
  }
};

// Selectors
export const getVisibleTodos = state => {
  const todosAr = Object.entries(state.todos.todosById);
  const { filter } = state.todos;

  switch (filter) {
    case 'ALL': {
      return todosAr;
    }
    case 'COMPLETED': {
      return todosAr.filter(item => item[1].completed === true);
    }
    case 'ACTIVE': {
      return todosAr.filter(item => item[1].completed !== true);
    }
    default:
      return todosAr;
  }
};

export const getCurrentTodos = state => {
  const { currentPage, todosPerPage } = state.pagination;

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

  return getVisibleTodos(state).slice(indexOfFirstTodo, indexOfLastTodo);
};

export const getPageNumbers = state => {
  const { todosPerPage } = state.pagination;

  const pageNumbers = [];
  const todoItems = getVisibleTodos(state);

  for (let i = 1; i <= Math.ceil(todoItems.length / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};

// Reducers
export const todos = (
  state = {
    todosById: {},
    isAddingTodo: false,
    filter: 'ALL'
  },
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case actions.ADD_TODO_REQUESTED: {
      return {
        ...state,
        isAddingTodo: true
      };
    }

    case actions.ADD_TODO: {
      const { id, key, text } = payload;

      return {
        ...state,
        todosById: {
          ...state.todosById,
          [id]: {
            key,
            text,
            completed: false
          }
        },
        isAddingTodo: false
      };
    }

    case actions.TOGGLE_TODO: {
      const { id } = payload;

      const newTodosById = { ...state.todosById };

      if (newTodosById[id]) {
        newTodosById[id].completed = !state.todosById[id].completed;
      }

      return {
        ...state,
        todosById: newTodosById
      };
    }

    case actions.CHANGE_FILTER: {
      const { filter } = payload;

      return {
        ...state,
        filter
      };
    }

    case actions.REMOVE_TODO: {
      const { id } = payload;

      const newTodosById = { ...state.todosById };
      delete newTodosById[id];

      return {
        ...state,
        todosById: newTodosById
      };
    }

    default:
      return state;
  }
};

export const pagination = (
  state = {
    currentPage: 1,
    todosPerPage: 4
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case actions.CHANGE_PAGE: {
      const { pageNumber } = payload;

      return {
        ...state,
        currentPage: pageNumber
      };
    }

    default:
      return state;
  }
};

export default combineReducers({
  todos,
  pagination
});
