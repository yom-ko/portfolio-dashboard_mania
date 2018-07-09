import { delay } from 'redux-saga';
import { put, takeEvery, fork, all, call } from 'redux-saga/effects';
import { actions as todoActions } from 'modules/todolist';
import { actions as storyActions } from 'modules/stories';
import * as api from 'utils/api';

// Sagas
function* addTodo(action) {
  yield delay(1000);
  yield put(todoActions.addTodo(action));
}

function* watchAddTodo() {
  yield takeEvery(todoActions.ADD_TODO_REQUESTED, addTodo);
}

function* fetchStories(action) {
  try {
    const data = yield call(api.fetchArticles, action.payload.url);
    const { results } = data;
    yield put(storyActions.receiveStories(results));
  } catch (err) {
    console.log(err);
  }
}

function* watchRequestStories() {
  yield takeEvery(storyActions.REQUEST_STORIES, fetchStories);
}

// Root saga
export default function* rootSaga() {
  yield all([fork(watchAddTodo), fork(watchRequestStories)]);
}
