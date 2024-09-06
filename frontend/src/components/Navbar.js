import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleClick = () => {
    logout();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header>
        <div className="container">
          <h1>School Admin Management System</h1>
          <button className="toggle-button" onClick={toggleSidebar}>
            ☰
          </button>
          <nav>
            {user && (
              <div className="user-info">
                <span>{user.email}</span>
                <button className="logout-button" onClick={handleClick}>
                  Log out
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>
      
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-button">Courses</Link>
        <Link to="/Anns" className="nav-button">Announcements</Link>
        <Link to="/students" className="nav-button">Students</Link>
        <Link to="/teachers" className="nav-button">Teachers</Link>
        <Link to="/instructors" className="nav-button">Instructors</Link>
      </div>
    </>
  );
};

export default Navbar;
