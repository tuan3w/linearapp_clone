import faker from '@faker-js/faker';
import { Issue, Priority, Status, User } from 'types/issue';

// used to track issue id
let globalID = 0;

function generateId(): number {
  globalID++;
  return globalID;
}

/**
 * fake API calls
 */
const repo = {
  [Status.BACKLOG]: randomIssues(Status.BACKLOG),
  [Status.TODO]: randomIssues(Status.TODO),
  [Status.IN_PROGRESS]: randomIssues(Status.IN_PROGRESS),
  [Status.DONE]: randomIssues(Status.DONE),
  [Status.CANCELED]: randomIssues(Status.CANCELED),
};

function randomIssue(status?: string): Issue {
  var keyPriority = Object.values(Priority)[
    Math.floor(Math.random() * Object.keys(Priority).length)
  ];
  let keyStatus =
    status ||
    Object.values(Status)[
      Math.floor(Math.random() * Object.keys(Status).length)
    ];
  return {
    id: 'GIT-' + generateId(),
    priority: keyPriority,
    description: '',
    status: keyStatus,
    title: faker.lorem.words(20),
    owner: randomOwner(),
    createdAt: new Date(),
  };
}
function randomIssues(status: string): Array<Issue> {
  let numIssues = Math.floor(Math.random() * 10);
  var issues: Array<Issue> = [];
  for (let i = 0; i < numIssues; i++) {
    let issue = randomIssue(status);
    issues.push(issue);
  }
  return issues;
}
function randomOwner(): User {
  return {
    name: faker.name.findName(),
    avatar: faker.image.avatar(),
  };
}

function loadIssues() {
  return repo;
}

function createIssue(issue: Issue) {
  // random id
  issue.id = 'GIT-' + generateId();

  issue.createdAt = new Date();

  // set default user
  issue.owner = { name: 'Tuan Nguyen' };

  //append issue to corresponding list
  let oldIssues = repo[issue.status];
  oldIssues.push(issue);
  repo[issue.status] = [...oldIssues];
}

function updateIssueStatusAndPos(
  issueId: string,
  srcStatus: string,
  destStatus: string,
  srcPos: number,
  destPos: number
) {
  let sourceList: Array<Issue> = repo[srcStatus];
  let destList: Array<Issue> = repo[destStatus];
  debugger;
  if (srcStatus === destStatus) {
    // update one list
    const issues = sourceList.splice(srcPos, 1);
    sourceList.splice(destPos, 0, issues[0]);
    // update data
    repo[srcStatus] = [...sourceList];
  } else {
    const issues = sourceList.splice(srcPos, 1);
    issues[0].status = destStatus;
    destList.splice(destPos, 0, issues[0]);

    // update data
    repo[srcStatus] = [...sourceList];
    repo[destStatus] = [...destList];
  }
}

function updateIssuePriority(
  issueId: string,
  status: string,
  newPriority: string
) {
  let list = repo[status];
  list.forEach((issue, index) => {
    if (issue.id === issueId) {
      issue.priority = newPriority;
      issue = { ...issue };
      list[index] = issue;
    }
  });
  // update the whole list
  repo[status] = [...list];
}
function updateIssueStatus(issueId: string, status: string, newStatus: string) {
  if (status === newStatus) return;

  let list = repo[status];
  let pos = 0;
  list.forEach((issue, index) => {
    if (issue.id === issueId) {
      pos = index;
    }
  });

  let issues = list.splice(pos, 1);
  issues[0].status = newStatus;
  // update the whole list
  repo[status] = [...list];

  repo[newStatus].push(issues[0]);
}

export default {
  loadIssues,
  updateIssueStatusAndPos,
  createIssue,
  updateIssuePriority,
  updateIssueStatus,
};
