const wait = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms));

let courses = [
  {
    id: 1,
    title: 'Redux Toolkit Store Setup',
    level: 'basic',
    lessons: 5,
    completed: false,
  },
  {
    id: 2,
    title: 'RTK Query Queries and Hooks',
    level: 'basic',
    lessons: 7,
    completed: true,
  },
  {
    id: 3,
    title: 'Mutations and Cache Invalidation',
    level: 'intermediate',
    lessons: 6,
    completed: false,
  },
  {
    id: 4,
    title: 'Optimistic Updates',
    level: 'advanced',
    lessons: 4,
    completed: false,
  },
  {
    id: 5,
    title: 'Polling, Refetching, and Lazy Queries',
    level: 'advanced',
    lessons: 8,
    completed: false,
  },
];

let nextId = 6;

export const fakeServer = {
  async getCourses(level = 'all') {
    await wait();
    if (level === 'all') {
      return [...courses];
    }

    return courses.filter((course) => course.level === level);
  },

  async getCourse(id) {
    await wait();
    const course = courses.find((item) => item.id === Number(id));

    if (!course) {
      throw new Error('Course not found');
    }

    return { ...course };
  },

  async searchCourses(query) {
    await wait(300);
    const search = query.trim().toLowerCase();

    if (!search) {
      return [];
    }

    return courses.filter((course) => course.title.toLowerCase().includes(search));
  },

  async addCourse(course) {
    await wait(500);
    const newCourse = {
      id: nextId,
      completed: false,
      lessons: Number(course.lessons) || 1,
      title: course.title,
      level: course.level,
    };

    nextId += 1;
    courses = [newCourse, ...courses];

    return newCourse;
  },

  async toggleCourse(id) {
    await wait(450);
    courses = courses.map((course) =>
      course.id === Number(id)
        ? { ...course, completed: !course.completed }
        : course,
    );

    return courses.find((course) => course.id === Number(id));
  },

  async getStats() {
    await wait(250);
    const completed = courses.filter((course) => course.completed).length;

    return {
      total: courses.length,
      completed,
      inProgress: courses.length - completed,
      generatedAt: new Date().toLocaleTimeString(),
    };
  },
};
