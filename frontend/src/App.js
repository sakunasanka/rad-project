import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Instructors from './pages/Instructors';

function App() {
    const { user } = useAuthContext();
  
    return (
      <div className="App">
        <BrowserRouter>

          <div className="pages">
            <Routes>
              
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
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
  