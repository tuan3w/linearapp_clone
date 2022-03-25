import api from 'apis';
import { AppDispatch, RootState } from 'store';
import { Issue } from 'types/issue';
import * as actionTypes from './actionTypes';

export const createIssue = (issue: Issue) => {
  return (dispatch: AppDispatch, getState: RootState) => {
    api.createIssue(issue);

    dispatch(loadIssues());
  };
};

export const loadIssues = () => {
  return (dispatch: AppDispatch, getState: RootState) => {
    let data = api.loadIssues();

    dispatch({ type: actionTypes.LOADED_ISSUES, payload: data });
  };
};

export const updateIssueStatusAndPos = (
  issueId: string,
  srcStatus: string,
  destStatus: string,
  srcPos: number,
  destPos: number
) => {
  return (dispatch: AppDispatch, getState: RootState) => {
    api.updateIssueStatusAndPos(
      issueId,
      srcStatus,
      destStatus,
      srcPos,
      destPos
    );

    dispatch(loadIssues());
  };
};

export const updateIssuePriority = (issue: Issue, priority: string) => {
  return (dispatch: AppDispatch, getState: RootState) => {
    api.updateIssuePriority(issue.id || '', issue.status, priority);

    dispatch(loadIssues());
  };
};

export const updateIssueStatus = (issue: Issue, status: string) => {
  return (dispatch: AppDispatch, getState: RootState) => {
    api.updateIssueStatus(issue.id || '', issue.status, status);
    let data = api.loadIssues();
    dispatch({ type: actionTypes.LOADED_ISSUES, payload: data });
    // dispatch(loadIssues());
  };
};
