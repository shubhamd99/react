import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "./components/CourseCard";
import {
  markLessonDone,
  resetLessons,
  selectCompletedLessons,
} from "./features/counter/counterSlice";
import {
  useAddCourseMutation,
  useGetCourseQuery,
  useGetCoursesQuery,
  useGetStatsQuery,
  useLazySearchCoursesQuery,
} from "./services/academyApi";

const levels = ["all", "basic", "intermediate", "advanced"];

export default function App() {
  const [level, setLevel] = useState("all");
  const [selectedId, setSelectedId] = useState(1);
  const [query, setQuery] = useState("");
  const [newCourse, setNewCourse] = useState({
    title: "",
    level: "basic",
    lessons: 3,
  });

  const dispatch = useDispatch();
  const completedLessons = useSelector(selectCompletedLessons);

  const coursesQuery = useGetCoursesQuery({ level });
  const courseDetail = useGetCourseQuery(selectedId);
  const statsQuery = useGetStatsQuery(undefined, {
    pollingInterval: 5000,
  });
  const [searchCourses, searchResult] = useLazySearchCoursesQuery();
  const [addCourse, addCourseState] = useAddCourseMutation();

  const courses = coursesQuery.data ?? [];

  const handleAddCourse = async (event) => {
    event.preventDefault();

    if (!newCourse.title.trim()) {
      return;
    }

    await addCourse(newCourse).unwrap();
    setNewCourse({ title: "", level: "basic", lessons: 3 });
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Redux Toolkit learning lab</p>
        <h1>RTK Query with Redux, from basic to advanced</h1>
        <p>
          Practice server-state fetching with RTK Query beside regular Redux
          slice state in one small React app.
        </p>
      </section>

      <section className="layout">
        <div className="panel panel--wide">
          <div className="panel__header">
            <div>
              <p className="step">1. Basic query and query arguments</p>
              <h2>Courses</h2>
            </div>
            <button
              className="icon-button"
              onClick={coursesQuery.refetch}
              type="button"
            >
              Refetch
            </button>
          </div>

          <div className="segmented-control" aria-label="Filter course level">
            {levels.map((item) => (
              <button
                className={level === item ? "active" : ""}
                key={item}
                onClick={() => setLevel(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>

          {coursesQuery.isFetching && (
            <p className="status">Loading courses...</p>
          )}
          {coursesQuery.isError && (
            <p className="error">Could not load courses.</p>
          )}

          <div className="course-list">
            {courses.map((course) => (
              <button
                className="course-row"
                key={course.id}
                onClick={() => setSelectedId(course.id)}
                type="button"
              >
                <CourseCard course={course} />
              </button>
            ))}
          </div>
        </div>

        <aside className="panel">
          <p className="step">2. Query by id</p>
          <h2>Selected course</h2>
          {courseDetail.data ? (
            <div className="detail">
              <span className={`pill pill--${courseDetail.data.level}`}>
                {courseDetail.data.level}
              </span>
              <h3>{courseDetail.data.title}</h3>
              <p>{courseDetail.data.lessons} lessons in this course.</p>
            </div>
          ) : (
            <p className="status">Choose a course.</p>
          )}
        </aside>
      </section>

      <section className="layout">
        <form className="panel" onSubmit={handleAddCourse}>
          <p className="step">3. Mutation and invalidation</p>
          <h2>Add course</h2>
          <label>
            Title
            <input
              onChange={(event) =>
                setNewCourse((course) => ({
                  ...course,
                  title: event.target.value,
                }))
              }
              placeholder="Course title"
              value={newCourse.title}
            />
          </label>
          <label>
            Level
            <select
              onChange={(event) =>
                setNewCourse((course) => ({
                  ...course,
                  level: event.target.value,
                }))
              }
              value={newCourse.level}
            >
              <option value="basic">basic</option>
              <option value="intermediate">intermediate</option>
              <option value="advanced">advanced</option>
            </select>
          </label>
          <label>
            Lessons
            <input
              min="1"
              onChange={(event) =>
                setNewCourse((course) => ({
                  ...course,
                  lessons: event.target.value,
                }))
              }
              type="number"
              value={newCourse.lessons}
            />
          </label>
          <button
            className="button"
            disabled={addCourseState.isLoading}
            type="submit"
          >
            {addCourseState.isLoading ? "Adding..." : "Add course"}
          </button>
        </form>

        <div className="panel">
          <p className="step">4. Lazy query</p>
          <h2>Search on demand</h2>
          <div className="search-row">
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try cache, query, polling..."
              value={query}
            />
            <button
              className="button"
              onClick={() => searchCourses(query)}
              type="button"
            >
              Search
            </button>
          </div>
          {searchResult.isFetching && <p className="status">Searching...</p>}
          <div className="mini-list">
            {(searchResult.data ?? []).map((course) => (
              <span key={course.id}>{course.title}</span>
            ))}
          </div>
        </div>

        <div className="panel">
          <p className="step">5. Polling and normal Redux state</p>
          <h2>Dashboard</h2>
          <div className="stats-grid">
            <strong>{statsQuery.data?.total ?? "-"}</strong>
            <span>Total</span>
            <strong>{statsQuery.data?.completed ?? "-"}</strong>
            <span>Done</span>
            <strong>{completedLessons}</strong>
            <span>Local lessons</span>
          </div>
          <p className="status">
            Stats refresh every 5s. Last:{" "}
            {statsQuery.data?.generatedAt ?? "loading"}
          </p>
          <div className="actions">
            <button
              className="button"
              onClick={() => dispatch(markLessonDone())}
              type="button"
            >
              Finish local lesson
            </button>
            <button
              className="button button--ghost"
              onClick={() => dispatch(resetLessons())}
              type="button"
            >
              Reset
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
