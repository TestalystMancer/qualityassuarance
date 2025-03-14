import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, handleLogout }) => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          QA Assessment
        </Link>
        <ul className="flex space-x-4">
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/" className="text-white hover:underline">Landing</Link>
              </li>
             
            </>
          )}
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/home" className="text-white hover:underline">Home</Link>
              </li>
              <li>
                <Link to="/users" className="text-white hover:underline">Users</Link>
              </li>
              <li>
                <Link to="/albums" className="text-white hover:underline">Albums</Link>
              </li>
              <li>
                <Link to="/photos" className="text-white hover:underline">Photos</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-white hover:underline">Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="text-white hover:underline">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
