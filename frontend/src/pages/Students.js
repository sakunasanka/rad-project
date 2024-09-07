import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Students() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    country: '',
    birth_Date: '',
    email: '',
  });
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = () => {
    axios
      .get('/api/students')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  };

  const handleCreateOrUpdateStudent = (e) => {
    e.preventDefault();
    if (editingStudent) {
      // Update the existing student
      axios
        .patch(`/api/students/${editingStudent._id}`, newStudent)
        .then(() => {
          setEditingStudent(null);
          setNewStudent({
            name: '',
            country: '',
            birth_Date: '',
            email: '',
          });
          fetchStudents();
        })
        .catch((error) => {
          console.error('Error updating student:', error);
        });
    } else {
      // Create a new student
      axios
        .post('/api/students', newStudent)
        .then(() => {
          setNewStudent({
            name: '',
            country: '',
            birth_Date: '',
            email: '',
          });
          fetchStudents();
        })
        .catch((error) => {
          console.error('Error creating student:', error);
        });
    }
  };

  const handleDeleteStudent = (id) => {
    axios
      .delete(`/api/students/${id}`)
      .then(() => {
        fetchStudents();
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
      });
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setNewStudent({
      name: student.name,
      country: student.country,
      birth_Date: student.birth_Date,
      email: student.email,
    });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div class="page-background">
      <h1>Students</h1>

      {/* Form for creating or updating a student */}
      <form onSubmit={handleCreateOrUpdateStudent}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={newStudent.name}
            onChange={(e) =>
              setNewStudent({ ...newStudent, name: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={newStudent.country}
            onChange={(e) =>
              setNewStudent({ ...newStudent, country: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="birth_Date">Birth Date:</label>
          <input
            type="date"
            id="birth_Date"
            value={newStudent.birth_Date}
            onChange={(e) =>
              setNewStudent({ ...newStudent, birth_Date: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={newStudent.email}
            onChange={(e) =>
              setNewStudent({ ...newStudent, email: e.target.value })
            }
            required
          />
        </div>
        <div>
          <button type="submit">
            {editingStudent ? 'Update Student' : 'Create Student'}
          </button>
          {editingStudent && (
            <button
              type="button"
              onClick={() => {
                setEditingStudent(null);
                setNewStudent({
                  name: '',
                  country: '',
                  birth_Date: '',
                  email: '',
                });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div>
        <h2>Student List</h2>
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              <p>Name: {student.name}</p>
              <p>Country: {student.country}</p>
              <p>Birth Date: {student.birth_Date}</p>
              <p>Email: {student.email}</p>
              <button
                class="ed-button"
                onClick={() => handleDeleteStudent(student._id)}
              >
                Delete
              </button>
              <button
                class="ed-button"
                onClick={() => handleEditStudent(student)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Students;
