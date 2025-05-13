import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout}) => {
  return (
    <nav className="navbar">
     

      {isLoggedIn ? (
         <li>
          <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
         </li>
      ) : (
        <Link to="/login" className="login-button">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;