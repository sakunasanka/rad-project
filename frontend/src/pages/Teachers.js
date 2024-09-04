import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    country: '',
    birth_Date: '',
    email: '',
    Subjects: '',
  });
  const [editingTeacher, setEditingTeacher] = useState(null);

  const fetchTeachers = () => {
    axios
      .get('/api/teachers')
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching teachers:', error);
      });
  };

  const handleCreateOrUpdateTeacher = (e) => {
    e.preventDefault();
    if (editingTeacher) {
      // Update the existing teacher
      axios
        .patch(`/api/teachers/${editingTeacher._id}`, newTeacher)
        .then(() => {
          setEditingTeacher(null);
          setNewTeacher({
            name: '',
            country: '',
            birth_Date: '',
            email: '',
            Subjects: '',
          });
          fetchTeachers();
        })
        .catch((error) => {
          console.error('Error updating teacher:', error);
        });
    } else {
      // Create a new teacher
      axios
        .post('/api/teachers', newTeacher)
        .then(() => {
          setNewTeacher({
            name: '',
            country: '',
            birth_Date: '',
            email: '',
            Subjects: '',
          });
          fetchTeachers();
        })
        .catch((error) => {
          console.error('Error creating teacher:', error);
        });
    }
  };

  const handleDeleteTeacher = (id) => {
    axios
      .delete(`/api/teachers/${id}`)
      .then(() => {
        fetchTeachers();
      })
      .catch((error) => {
        console.error('Error deleting teacher:', error);
      });
  };

  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setNewTeacher({
      name: teacher.name,
      country: teacher.country,
      birth_Date: teacher.birth_Date,
      email: teacher.email,
      Subjects: teacher.Subjects,
    });
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div>
      <h1>Teachers</h1>

      <div className="home">
        <div className="card">
          {/* Form for creating or updating a teacher */}
          <form onSubmit={handleCreateOrUpdateTeacher}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newTeacher.name}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                value={newTeacher.country}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, country: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="birth_Date">Birth Date:</label>
              <input
                type="date"
                id="birth_Date"
                value={newTeacher.birth_Date}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, birth_Date: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={newTeacher.email}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="Subjects">Subjects:</label>
              <input
                type="text"
                id="Subjects"
                value={newTeacher.Subjects}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, Subjects: e.target.value })
                }
                required
              />
            </div>
            <div>
              <button type="submit">
                {editingTeacher ? 'Update Teacher' : 'Add Teacher'}
              </button>
              {editingTeacher && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingTeacher(null);
                    setNewTeacher({
                      name: '',
                      country: '',
                      birth_Date: '',
                      email: '',
                      Subjects: '',
                    });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="card">
          <h2>Teacher List</h2>
          <ul>
            {teachers.map((teacher) => (
              <li key={teacher._id}>
                <p>Name: {teacher.name}</p>
                <p>Country: {teacher.country}</p>
                <p>Birth Date: {teacher.birth_Date}</p>
                <p>Email: {teacher.email}</p>
                <p>Subjects: {teacher.Subjects}</p>
                <button
                  class="ed-button"
                  onClick={() => handleDeleteTeacher(teacher._id)}
                >
                  Delete
                </button>
                <button
                  class="ed-button"
                  onClick={() => handleEditTeacher(teacher)}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Teachers;
