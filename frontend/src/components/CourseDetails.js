import React, { useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useCoursesContext } from '../hooks/useCoursesContext';
import { useAuthContext } from '../hooks/useAuthContext';

const CourseDetails = ({ course }) => {
  const { dispatch } = useCoursesContext();
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCourse, setUpdatedCourse] = useState(course);

  // Handle deleting the course
  const handleDeleteClick = async () => {
    if (!user) return;

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

  // Handle edit click - switch to edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle cancel edit click - revert to view mode
  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedCourse(course); // Reset the updatedCourse state to the original course
  };

  // Handle updating the course
  const handleUpdateClick = async () => {
    if (!user) return;

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
      setIsEditing(false); // Exit edit mode after successful update
    }
  };

  // Handle input changes in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCourse({ ...updatedCourse, [name]: value });
  };

  return (
    <div className="course-details">
      <h4>{isEditing ? 'Edit Course' : course.course_name}</h4>

      {/* Editing state */}
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
        // Normal view state
        <p>
          <strong>Course ID: </strong>
          {course.course_id}
        </p>
      )}

      {/* Display how long ago the course was created */}
      <p>
        {formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}
      </p>

      {/* Edit, Update, and Cancel Buttons */}
      {isEditing ? (
        <div>
          <button onClick={handleUpdateClick} className="btn update-btn">
            Update Course
          </button>
          <button onClick={handleCancelClick} className="btn cancel-btn">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <button onClick={handleEditClick} className="btn edit-btn">
            Edit
          </button>
          <button onClick={handleDeleteClick} className="btn delete-btn">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
