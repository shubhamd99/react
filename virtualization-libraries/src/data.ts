export type Person = {
  id: number;
  name: string;
  role: string;
  city: string;
  score: number;
  status: 'Active' | 'Paused' | 'Review';
};

export type ApiItem = {
  id: number;
  title: string;
  owner: string;
  priority: 'Low' | 'Medium' | 'High';
};

const roles = ['Frontend', 'Backend', 'Full stack', 'DevOps', 'QA'];
const cities = ['Bengaluru', 'Pune', 'Delhi', 'Hyderabad', 'Chennai'];
const statuses: Person['status'][] = ['Active', 'Paused', 'Review'];
const priorities: ApiItem['priority'][] = ['Low', 'Medium', 'High'];

export const largeList = Array.from({ length: 10_000 }, (_, index) => ({
  id: index + 1,
  title: `Virtual row ${index + 1}`,
  details: `Only visible rows are mounted. This item belongs to group ${
    (index % 8) + 1
  }.`,
}));

export const variableHeightUsers = Array.from({ length: 7_500 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  notes:
    index % 3 === 0
      ? 'This row is taller so React Virtuoso can show automatic measuring.'
      : 'Normal row with simple text.',
  height: 54 + (index % 4) * 14,
}));

export const tablePeople: Person[] = Array.from({ length: 5_000 }, (_, index) => ({
  id: index + 1,
  name: `Candidate ${index + 1}`,
  role: roles[index % roles.length],
  city: cities[index % cities.length],
  score: 55 + (index % 45),
  status: statuses[index % statuses.length],
}));

export async function fetchMockPage(page: number, pageSize = 30) {
  const total = 240;
  const start = page * pageSize;
  const end = Math.min(start + pageSize, total);

  // A tiny delay makes the example behave like a real API call.
  await new Promise((resolve) => window.setTimeout(resolve, 450));

  const items: ApiItem[] = Array.from({ length: end - start }, (_, index) => {
    const id = start + index + 1;

    return {
      id,
      title: `API task ${id}`,
      owner: `Owner ${(id % 12) + 1}`,
      priority: priorities[id % priorities.length],
    };
  });

  return {
    items,
    nextPage: end < total ? page + 1 : undefined,
  };
}
