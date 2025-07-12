import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import useAuthStore from './store/useAuthStore.js';


function App() {
   const fetchUser = useAuthStore((state) => state.fetchUser);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
