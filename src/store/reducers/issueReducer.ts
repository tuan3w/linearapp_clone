import { Issue, Status } from 'types/issue';
import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  backlog: [] as Array<Issue>,
  todo: [] as Array<Issue>,
  inProgress: [] as Array<Issue>,
  done: [] as Array<Issue>,
  canceled: [] as Array<Issue>,
};

const issueReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.LOADED_ISSUES:
      let data = payload;
      return {
        backlog: data[Status.BACKLOG] || [],
        todo: data[Status.TODO] || [],
        inProgress: data[Status.IN_PROGRESS] || [],
        done: data[Status.DONE] || [],
        canceled: data[Status.CANCELED] || [],
      };
    default:
      break;
  }
  return state;
};
export default issueReducer;
