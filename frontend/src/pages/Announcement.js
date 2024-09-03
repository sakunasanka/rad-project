import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    a_title: '',
    a_body: '',
  });
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  // Function to fetch announcements from the backend
  const fetchAnnouncements = () => {
    axios
      .get('/api/Anns')
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.error('Error fetching announcements:', error);
      });
  };

  // Function to handle form submission for creating a new announcement
  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    axios
      .post('/api/Anns', newAnnouncement)

      .then(() => {
        // Clear the form and update the list of announcements
        setNewAnnouncement({ a_title: '', a_body: '' });
        fetchAnnouncements();
      })
      .catch((error) => {
        console.error('Error creating announcement:', error);
      });
  };

  // Function to handle form submission for updating an existing announcement
  const handleUpdateAnnouncement = (e) => {
    e.preventDefault();
    if (!editingAnnouncement) return;

    axios
      .patch(`/api/Anns/${editingAnnouncement._id}`, newAnnouncement)
      .then(() => {
        setEditingAnnouncement(null);
        setNewAnnouncement({ a_title: '', a_body: '' });
        fetchAnnouncements();
      })
      .catch((error) => {
        console.error('Error updating announcement:', error);
      });
  };

  // Function to handle deleting an announcement
  const handleDeleteAnnouncement = (id) => {
    axios
      .delete(`/api/Anns/${id}`)
      .then(() => {
        fetchAnnouncements();
      })
      .catch((error) => {
        console.error('Error deleting announcement:', error);
      });
  };

  // Function to populate the form fields with the current announcement data
  const handleEditAnnouncement = (announcement) => {
    setEditingAnnouncement(announcement);
    setNewAnnouncement({
      a_title: announcement.a_title,
      a_body: announcement.a_body,
    });
  };

  useEffect(() => {
    // Fetch announcements when the component mounts
    fetchAnnouncements();
  }, []);

  return (
    <div>
      <h1>Announcements</h1>

      {/* Form for creating or updating an announcement */}
      <form
        onSubmit={
          editingAnnouncement
            ? handleUpdateAnnouncement
            : handleCreateAnnouncement
        }
      >
        <div>
          <label htmlFor="a_title">Title:</label>
          <input
            type="text"
            id="a_title"
            value={newAnnouncement.a_title}
            onChange={(e) =>
              setNewAnnouncement({
                ...newAnnouncement,
                a_title: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="a_body">Body:</label>
          <textarea
            id="a_body"
            value={newAnnouncement.a_body}
            onChange={(e) =>
              setNewAnnouncement({ ...newAnnouncement, a_body: e.target.value })
            }
          />
        </div>
        <div>
          <button type="submit">
            {editingAnnouncement
              ? 'Update Announcement'
              : 'Make an Announcement'}
          </button>
          {editingAnnouncement && (
            <button
              type="button"
              onClick={() => {
                setEditingAnnouncement(null);
                setNewAnnouncement({ a_title: '', a_body: '' });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List of announcements */}
      <div>
        <h2>Announcement List</h2>
        <ul>
          {announcements.map((announcement) => (
            <li key={announcement._id}>
              <h3>{announcement.a_title}</h3>
              <p>{announcement.a_body}</p>
              <p>
                Created: {new Date(announcement.createdAt).toLocaleString()}
              </p>
              {announcement.updatedAt && (
                <p>
                  Last Edited:{' '}
                  {new Date(announcement.updatedAt).toLocaleString()}
                </p>
              )}
              <button
                class="ed-button"
                onClick={() => handleEditAnnouncement(announcement)}
              >
                Edit
              </button>
              <button
                class="ed-button"
                onClick={() => handleDeleteAnnouncement(announcement._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Announcements;
