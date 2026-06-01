import { useToggleCourseMutation } from '../services/academyApi';

export default function CourseCard({ course }) {
  const [toggleCourse, { isLoading }] = useToggleCourseMutation();

  return (
    <article className="course-card">
      <div>
        <div className="course-card__header">
          <h3>{course.title}</h3>
          <span className={`pill pill--${course.level}`}>{course.level}</span>
        </div>
        <p>{course.lessons} lessons</p>
      </div>

      <button
        className={course.completed ? 'button button--success' : 'button'}
        disabled={isLoading}
        onClick={() => toggleCourse(course.id)}
        type="button"
      >
        {course.completed ? 'Completed' : 'Mark done'}
      </button>
    </article>
  );
}
