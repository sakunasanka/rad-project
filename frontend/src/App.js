import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// Import your components
import Home from './pages/Home';

import Announcements from './pages/Announcements';
import Students from './pages/Students';
import Teachers from './pages/Teachers'; // Import the Teachers component
import Instructors from './pages/Instructors';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/Anns"
              element={user ? <Announcements /> : <Navigate to="/login" />}
            />
            <Route
              path="/students"
              element={user ? <Students /> : <Navigate to="/login" />}
            />
            <Route
              path="/teachers"
              element={user ? <Teachers /> : <Navigate to="/login" />}
            />
            <Route
              path="/instructors"
              element={user ? <Instructors /> : <Navigate to="/login" />}
            />
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
