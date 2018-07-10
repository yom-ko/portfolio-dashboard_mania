// Actions
export const actions = {
  // Action types
  REQUEST_STORIES: '@stories/REQUEST_STORIES',
  RECEIVE_STORIES: '@stories/RECEIVE_STORIES',
  INVALIDATE_STORIES: '@stories/INVALIDATE_STORIES',

  // Action creators
  requestStories(url) {
    return {
      type: actions.REQUEST_STORIES,
      payload: { url }
    };
  },

  receiveStories(results, updateTime) {
    return {
      type: actions.RECEIVE_STORIES,
      payload: { results, updateTime }
    };
  },

  invalidateStories() {
    return {
      type: actions.INVALIDATE_STORIES
    };
  }
};

// reducer
const initialState = {
  storiesById: {},
  isFetchingStories: false,
  lastUpdated: null,
  invalidated: true
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
      const { results, updateTime } = payload;
      let newStoriesById = {};

      results.forEach(result => {
        newStoriesById = { ...newStoriesById, [result.title]: result };
      });

      return {
        ...state,
        storiesById: {
          ...state.storiesById,
          ...newStoriesById
        },
        isFetchingStories: false,
        lastUpdated: updateTime,
        invalidated: false
      };
    }

    case actions.INVALIDATE_STORIES: {
      return {
        ...state,
        invalidated: true
      };
    }

    default:
      return state;
  }
};
