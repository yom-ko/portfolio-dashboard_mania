// Actions
export const actions = {
  // Action types
  REQUEST_STORIES: '@stories/REQUEST_STORIES',
  RECEIVE_STORIES: '@stories/RECEIVE_STORIES',

  // Action creators
  requestStories(url) {
    return {
      type: actions.REQUEST_STORIES,
      payload: { url }
    };
  },

  receiveStories(results) {
    return {
      type: actions.RECEIVE_STORIES,
      payload: { results }
    };
  }
};

// reducer
const initialState = {
  items: {},
  isFetchingStories: false,
  pagination: {
    currentPage: 0,
    itemsPerPage: 8,
    nextPage: undefined
  }
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case actions.REQUEST_STORIES: {
      return {
        ...state,
        isFetchingStories: true
      };
    }

    case actions.RECEIVE_STORIES: {
      const { results } = payload;
      let newItems = {};

      results.forEach(result => {
        newItems = { ...newItems, [result.title]: result };
      });

      return {
        ...state,
        items: {
          ...state.items,
          ...newItems
        },
        isFetchingStories: false
      };
    }

    default:
      return state;
  }
};
