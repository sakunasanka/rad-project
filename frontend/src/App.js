import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// Import your components
import Navbar from './components/Navbar'; // Import Navbar component
import Announcements from './pages/Announcements';
import Login from './pages/Login'; // Assuming you have a Login page
import Home from './pages/Home'; // Assuming you have a Home page

function App() {
  const { user } = useAuthContext(); // Retrieve user from auth context

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/announcements"
              element={user ? <Announcements /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/announcements" />}
            />
            <Route path="*" element={<Navigate to="/" />} /> {/* Redirects unknown paths to home */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
