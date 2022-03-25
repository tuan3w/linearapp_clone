import React, { useEffect } from 'react';
import { connectMenu } from 'react-contextmenu';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import {
  loadIssues,
  updateIssuePriority,
  updateIssueStatus,
} from 'store/actions/issueActions';
import { Issue } from 'types/issue';
import IssueContextMenu from './IssueContextMenu';
import IssueRow from './IssueRow';

const ConnectedMenu = connectMenu('ISSUE_CONTEXT_MENU')(IssueContextMenu);
function IssueList() {
  const dispatch = useDispatch<AppDispatch>();
  const allIssues = useSelector((state: RootState) => state.issues);

  let issues = [
    ...allIssues.backlog,
    ...allIssues.todo,
    ...allIssues.inProgress,
    ...allIssues.done,
    ...allIssues.canceled,
  ];
  // sort issues by id
  issues = issues.sort((a, b) => {
    let aId = parseInt(a.id.split('-')[1]);
    let bId = parseInt(b.id.split('-')[1]);
    return aId - bId;
  });

  const handleIssueStatusChange = (issue: Issue, status: string) => {
    dispatch(updateIssueStatus(issue, status));
  };

  const handleIssuePriorityChange = (issue: Issue, priority: string) => {
    dispatch(updateIssuePriority(issue, priority));
  };

  useEffect(() => {
    dispatch(loadIssues());
  }, []);

  var issueRows = issues.map((issue, idx) => (
    <IssueRow
      issue={issue}
      onChangePriority={handleIssuePriorityChange}
      onChangeStatus={handleIssueStatusChange}
    />
  ));
  return (
    <div className="flex flex-col overflow-auto">
      {issueRows}
      <ConnectedMenu />
    </div>
  );
}

export default IssueList;
