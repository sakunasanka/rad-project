import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const [newInstructor, setNewInstructor] = useState({
    name: '',
    country: '',
    birth_Date: '',
    email: '',
    Subjects: '',
  });
  const [editingInstructor, setEditingInstructor] = useState(null);

  // Fetch instructors from the server
  const fetchInstructors = () => {
    axios
      .get('/api/instructors')
      .then((response) => {
        setInstructors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching instructors:', error);
      });
  };

  // Handle creating or updating an instructor
  const handleCreateOrUpdateInstructor = (e) => {
    e.preventDefault();
    if (editingInstructor) {
      // Update the existing instructor
      axios
        .patch(`/api/instructors/${editingInstructor._id}`, newInstructor)
        .then(() => {
          setEditingInstructor(null);
          setNewInstructor({
            name: '',
            country: '',
            birth_Date: '',
            email: '',
            Subjects: '',
          });
          fetchInstructors(); // Refresh the instructor list
        })
        .catch((error) => {
          console.error('Error updating instructor:', error);
        });
    } else {
      // Create a new instructor
      axios
        .post('/api/instructors', newInstructor)
        .then(() => {
          setNewInstructor({
            name: '',
            country: '',
            birth_Date: '',
            email: '',
            Subjects: '',
          });
          fetchInstructors(); // Refresh the instructor list
        })
        .catch((error) => {
          console.error('Error creating instructor:', error);
        });
    }
  };

  // Handle deleting an instructor
  const handleDeleteInstructor = (id) => {
    axios
      .delete(`/api/instructors/${id}`)
      .then(() => {
        fetchInstructors(); // Refresh the instructor list
      })
      .catch((error) => {
        console.error('Error deleting instructor:', error);
      });
  };

  // Handle editing an instructor
  const handleEditInstructor = (instructor) => {
    setEditingInstructor(instructor);
    setNewInstructor({
      name: instructor.name,
      country: instructor.country,
      birth_Date: instructor.birth_Date.split('T')[0], // Format date for input
      email: instructor.email,
      Subjects: instructor.Subjects,
    });
  };

  // Fetch instructors on component mount
  useEffect(() => {
    fetchInstructors();
  }, []);

  return (
    <div>
      <h1>Instructors</h1>

      {/* Form for creating or updating an instructor */}
      <form onSubmit={handleCreateOrUpdateInstructor}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={newInstructor.name}
            onChange={(e) =>
              setNewInstructor({ ...newInstructor, name: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={newInstructor.country}
            onChange={(e) =>
              setNewInstructor({ ...newInstructor, country: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="birth_Date">Birth Date:</label>
          <input
            type="date"
            id="birth_Date"
            value={newInstructor.birth_Date}
            onChange={(e) =>
              setNewInstructor({ ...newInstructor, birth_Date: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={newInstructor.email}
            onChange={(e) =>
              setNewInstructor({ ...newInstructor, email: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="Subjects">Subjects:</label>
          <input
            type="text"
            id="Subjects"
            value={newInstructor.Subjects}
            onChange={(e) =>
              setNewInstructor({ ...newInstructor, Subjects: e.target.value })
            }
            required
          />
        </div>
        <div>
          <button type="submit">
            {editingInstructor ? 'Update Instructor' : 'Add Instructor'}
          </button>
          {editingInstructor && (
            <button
              type="button"
              onClick={() => {
                setEditingInstructor(null);
                setNewInstructor({
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

      <div>
        <h2>Instructor List</h2>
        <ul>
          {instructors.map((instructor) => (
            <li key={instructor._id}>
              <p>Name: {instructor.name}</p>
              <p>Country: {instructor.country}</p>
              <p>Birth Date: {instructor.birth_Date.split('T')[0]}</p>
              <p>Email: {instructor.email}</p>
              <p>Subjects: {instructor.Subjects}</p>
              <button onClick={() => handleEditInstructor(instructor)}>
                Edit
              </button>
              <button onClick={() => handleDeleteInstructor(instructor._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Instructors;
