import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import Users from './components/Users';
import Albums from './components/Albums';
import Photos from './components/Photos';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Dummy authentication: username "user" and password "password"
  const handleLogin = (username, password) => {
    if (username === 'user' && password === 'password') {
      setIsAuthenticated(true);
      return true;
    } else {
      localStorage.removeItem('isAuthenticated');
      return false;
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/home" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Users />
          </ProtectedRoute>
        } />
        <Route path="/albums" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Albums />
          </ProtectedRoute>
        } />
        <Route path="/photos" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Photos />
          </ProtectedRoute>
        } />
        {/* Redirect any unknown routes to landing page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
