import { useEffect } from 'react';
import { useCoursesContext } from '../hooks/useCoursesContext';
import { useAuthContext } from '../hooks/useAuthContext';

// components
import CourseDetails from '../components/CourseDetails';
import CourseForm from '../components/CourseForm';

const Home = () => {
  const { courses, dispatch } = useCoursesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('/api/courses', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_COURSES', payload: json });
      }
    };

    if (user) {
      fetchCourses();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="courses">
        <h1>Courses</h1>
        {courses &&
          courses.map((course) => (
            <CourseDetails course={course} key={course._id} />
          ))}
      </div>
      <CourseForm />
    </div>
  );
};

export default Home;
