import { combineReducers } from 'redux';
import todolist from 'modules/todolist';
import stories from 'modules/stories';

export default combineReducers({
  todolist,
  stories
});
