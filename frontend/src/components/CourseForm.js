import { useState } from 'react';
import { useCoursesContext } from '../hooks/useCoursesContext';
import { useAuthContext } from '../hooks/useAuthContext';

const CourseForm = () => {
  const { dispatch } = useCoursesContext();
  const { user } = useAuthContext();

  const [course_name, setName] = useState('');
  const [course_id, setID] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const course = { course_name, course_id };

    const response = await fetch('/api/courses', {
      method: 'POST',
      body: JSON.stringify(course),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setName('');
      setID('');
      setEmptyFields([]);
      console.log('new course added:', json);
      dispatch({ type: 'CREATE_COURSE', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Course</h3>

      <label>Course Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={course_name}
        className={emptyFields.includes('course_name') ? 'error' : ''}
      />

      <label>Course ID:</label>
      <input
        type="number"
        onChange={(e) => setID(e.target.value)}
        value={course_id}
        className={emptyFields.includes('course_id') ? 'error' : ''}
      />

      <button>Add Course</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CourseForm;
