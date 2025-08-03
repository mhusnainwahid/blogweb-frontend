import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-lg z-50 relative">
      <div className="flex items-center space-x-6 font-medium">
        <Link to="/" className="text-2xl font-extrabold tracking-wide text-white hover:opacity-90">
          BlogVerse
        </Link>
        <Link to="/" className="hover:underline hover:text-gray-200 transition duration-200">
          Home
        </Link>
        <Link to="/about" className="hover:underline hover:text-gray-200 transition duration-200">
          About
        </Link>
        <div className="relative">
          <button
            className="hover:underline hover:text-gray-200 transition duration-200"
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            Categories ▾
          </button>
          {categoryOpen && (
            <div className="absolute left-0 mt-2 w-56 bg-white text-gray-800 rounded shadow-lg z-50 overflow-hidden border border-gray-100">
              {[
                'Technology', 'Health & Wellness', 'Travel',
                'Education', 'Lifestyle', 'Finance',
                'Entertainment', 'Food', 'Personal Development', 'News & Politics'
              ].map((cat, idx) => (
                <Link
                  key={idx}
                  to={`/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/\s/g, '-')}`}
                  className="block px-4 py-2 hover:bg-gray-100 border-b last:border-none"
                  onClick={() => setCategoryOpen(false)}
                >
                  {cat}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          to="/blogform"
          className="bg-white text-purple-700 font-semibold px-4 py-1.5 rounded-full shadow hover:bg-gray-100 transition duration-200"
        >
          + Create Blog
        </Link>
      </div>
      <div className="relative">
        <button
          className="flex items-center gap-2 hover:text-gray-200 transition duration-200"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <FaUserCircle size={24} />
          <span className="hidden sm:inline-block">Profile</span>
        </button>

        {profileOpen && (
          <div className="absolute right-0 mt-3 w-48 bg-white text-gray-900 shadow-md rounded-md overflow-hidden z-50 border border-gray-100">
            <Link
              to="/yourblogs"
              className="block px-4 py-2 hover:bg-gray-100 border-b"
              onClick={() => setProfileOpen(false)}
            >
              Your Blogs
            </Link>
            <Link
              to="/userprofile"
              className="block px-4 py-2 hover:bg-gray-100 border-b"
              onClick={() => setProfileOpen(false)}
            >
              Your Profile
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
