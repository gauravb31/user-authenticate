import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './component/Navbar';

//import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
 

useEffect(() => {
  const token = localStorage.getItem('token');
  const storedUsername = localStorage.getItem('username');
  setIsLoggedIn(!!token);
  if (storedUsername) setUsername(storedUsername);
}, []);

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  setIsLoggedIn(false);
  setUsername('');
};

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        username={username}
        handleLogout={handleLogout}

      />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
        <Route path="/signup" element={<Signup />} />
        
        
      </Routes>

    </Router>
  );
}

export default App;