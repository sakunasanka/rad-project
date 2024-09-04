import React, { useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useCoursesContext } from '../hooks/useCoursesContext';
import { useAuthContext } from '../hooks/useAuthContext';

const CourseDetails = ({ course }) => {
  const { dispatch } = useCoursesContext();
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCourse, setUpdatedCourse] = useState(course);

  const handleDeleteClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/courses/' + course._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_COURSE', payload: json });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedCourse(course);
  };

  const handleUpdateClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/courses/' + course._id, {
      method: 'PATCH',
      body: JSON.stringify(updatedCourse),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'UPDATE_COURSE', payload: json });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCourse({ ...updatedCourse, [name]: value });
  };

  return (
    <div className="course-details">
      <h4>{isEditing ? 'Edit Course' : course.course_name}</h4>
      {isEditing ? (
        <div>
          <p>
            <strong>Course ID: </strong>
            <input
              type="number"
              name="course_id"
              value={updatedCourse.course_id}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Course Name: </strong>
            <input
              type="text"
              name="course_name"
              value={updatedCourse.course_name}
              onChange={handleChange}
            />
          </p>
        </div>
      ) : (
        <p>
          <strong>Course ID: </strong>
          {course.course_id}
        </p>
      )}
      <p>
        {formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}
      </p>
      {isEditing ? (
        <div>
          <button onClick={handleUpdateClick}>Update Course</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <div>
          <span
            className="material-symbols-outlined"
            onClick={handleDeleteClick}
          >
            delete
          </span>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
