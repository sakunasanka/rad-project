import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';


import Students from './pages/Students';

function App() {
    const { user } = useAuthContext();
  
    return (
        <div className="App">
      <BrowserRouter>
      <div className="pages">

      <Route
              path="/students"
              element={user ? <Students /> : <Navigate to="/login" />}
            />
            </div>
      </BrowserRouter>
    </div>
  );
}

export default App;