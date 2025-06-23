import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const NavBar = () => {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(false);
  const [image, setImage] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const dropdownRef = useRef();

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('accessToken');
      setImage(localStorage.getItem('img'));
      setLogin(!!token);
    };

    checkLogin();
    window.addEventListener('storage', checkLogin);
    window.addEventListener('login', checkLogin);

    return () => {
      window.removeEventListener('storage', checkLogin);
      window.removeEventListener('login', checkLogin);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledToTop(window.scrollY <= 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      await axiosInstance.post('/api/user/logout/', {
        refresh: refreshToken,
      });

      localStorage.clear();
      setLogin(false);
      navigate('/login');
    } catch (err) {
      console.log(err);
      localStorage.clear();
      setLogin(false);
      navigate('/login');
    }
  };

  return (
    <div>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-lg ${
          scrolledToTop ? 'shadow-none' : 'shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6">
          <div className="flex items-center space-x-2">
            <img className="h-12 w-12" src="/images/fork.png" alt="Logo" />
            <span className="text-xl font-bold text-gray-900">
              My <span className="text-red-600">Food</span>
            </span>
          </div>

          <div className="flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-semibold text-base transition ${
                  isActive ? 'text-red-600' : 'text-gray-700'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/food/"
              className={({ isActive }) =>
                `font-semibold text-base transition ${
                  isActive ? 'text-red-600' : 'text-gray-700'
                }`
              }
            >
              Food
            </NavLink>
            <NavLink
              to="/food/add-to-card/"
              className={({ isActive }) =>
                `font-semibold text-base transition ${
                  isActive ? 'text-red-600' : 'text-gray-700'
                }`
              }
            >
              Cart
            </NavLink>
          </div>

          <div className="relative" ref={dropdownRef}>
            {isLogin ? (
              <div className="relative">
                <img
                  src={image}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-red-600 shadow cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-10">
                    <Link
                      to="/profile/"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink to="/login/">
                <button className="rounded-md px-5 py-2 bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition">
                  Login
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </nav>

      <div className="h-20"></div>
    </div>
  );
};

export default NavBar;