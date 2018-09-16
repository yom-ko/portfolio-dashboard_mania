import { delay } from 'redux-saga';
import { put, takeEvery, fork, all, call } from 'redux-saga/effects';
import { actions as todoListActions } from 'modules/todolist';
import { actions as storiesActions } from 'modules/stories';
import * as api from 'utils/api';

// Sagas
function* addTodo(action) {
  yield delay(1000);
  yield put(todoListActions.addTodo(action));
}

function* watchAddTodo() {
  yield takeEvery(todoListActions.ADD_TODO_REQUESTED, addTodo);
}

function* fetchStories(action) {
  try {
    const data = yield call(api.fetchArticles, action.payload.url);
    const { results } = data;
    const rawUpdateTime = new Date();
    const updateTime = rawUpdateTime.toLocaleTimeString('ru-RU');
    yield put(storiesActions.receiveStories(results, updateTime));
  } catch (err) {
    console.log(err);
  }
}

function* watchRequestStories() {
  yield takeEvery(storiesActions.REQUEST_STORIES, fetchStories);
}

// Root saga
export default function* rootSaga() {
  yield all([fork(watchAddTodo), fork(watchRequestStories)]);
}
