export type User = { name: string; avatarUrl: string };

export type Issue = {
  id: string;
  userId: string;
  title: string;
  priority: number;
  status: number;
};

const defaultIssues: Issue[] = [
  {
    id: 'REM-1',
    userId: 'chance',
    title: 'Community stuff [TODO: rename this]',
    priority: 0,
    status: 1,
  },
  {
    id: 'REM-2',
    userId: 'ryan',
    title: 'Provide `matches` to loader/action/meta args [TODO: flesh this out]',
    priority: 0,
    status: 3,
  },
  {
    id: 'REM-3',
    userId: 'chance',
    title: 'ci - update RR workflow to comment again',
    priority: 1,
    status: 3,
  },
  {
    id: 'REM-4',
    userId: 'chance',
    title: 'Write decision doc on replacing `@remix-run/dev` with `remix`',
    priority: 0,
    status: 1,
  },
  {
    id: 'REM-5',
    userId: 'chance',
    title: 'Make a list of new docs/guides that we want to write',
    priority: 3,
    status: 1,
  },
  {
    id: 'REM-6',
    userId: 'chance',
    title: 'React Router + Webpack migration guide using BYOC',
    priority: 4,
    status: 2,
  },
  {
    id: 'REM-7',
    userId: 'ryan',
    title: 'Fetcher API Updates Decision Doc',
    priority: 0,
    status: 0,
  },
  {
    id: 'REM-8',
    userId: 'ryan',
    title: 'Add `createCloudflareDurableObjectSessionStorage`',
    priority: 1,
    status: 2,
  },
  {
    id: 'REM-9',
    userId: 'ryan',
    title: 'Add CF workers ESM request handler',
    priority: 0,
    status: 2,
  },
];

export async function getIssues() {
  return defaultIssues;
}

export async function getIssue(id: string) {
  return defaultIssues.find((issue) => issue.id === id);
}

export async function addIssue(issue: Issue) {
  defaultIssues.push(issue);
}

export async function updateIssue(id: string, updates: any) {
  const issue = defaultIssues.find((issue) => issue.id === id);
  if (!issue) return null;
  if (updates.priority) {
    updates.priority = parseInt(updates.priority, 10);
  }
  Object.assign(issue, updates);
  return issue;
}
