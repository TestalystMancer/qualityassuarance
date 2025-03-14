import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the QA Assessment Web App</h1>
      <p className="mb-4 text-lg">
        This is the landing page. Please <Link className="text-blue-500 hover:underline" to="/login">Login</Link> to continue.
      </p>
      <Link className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" to="/login">
        Get Started
      </Link>
    </div>
  );
};

export default LandingPage;
