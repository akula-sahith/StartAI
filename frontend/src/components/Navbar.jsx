import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Cpu, LayoutDashboard, LogOut, User, ChevronDown, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.displayName) {
      const parts = user.displayName.split(' ');
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0][0].toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  const getDisplayName = () => {
    return user?.displayName || user?.email?.split('@')[0] || 'User';
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-sm border-b border-neutral-800 px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-neutral-900 p-2 rounded-lg border border-neutral-800">
            <Cpu className="w-5 h-5 text-neutral-300" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">
            StartAI
          </span>
        </Link>

        {user && (
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/create-startup"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/create-startup')
                  ? 'bg-neutral-900 text-white border border-neutral-800'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent'
              }`}
            >
              Create Workspace
            </Link>
            <Link
              to="/optimize-startup"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/optimize-startup')
                  ? 'bg-neutral-900 text-white border border-neutral-800'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent'
              }`}
            >
              Optimize Workspace
            </Link>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {!user ? (
          <>
            {/* Not Logged In — Login & Signup */}
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-white hover:bg-neutral-200 text-black transition-all duration-200"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            {/* Logged In — Dashboard + User Profile */}
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/dashboard')
                  ? 'bg-white text-black shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            {/* User Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-neutral-900 transition-all duration-200"
                id="user-menu-button"
              >
                <div className="user-avatar">
                  {getUserInitials()}
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-neutral-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 user-dropdown animate-fade-in-down">
                  {/* User Info Header */}
                  <div className="px-4 py-3.5 border-b border-neutral-800">
                    <p className="text-sm font-semibold text-white truncate">
                      {getDisplayName()}
                    </p>
                    <p className="text-xs text-neutral-500 truncate mt-0.5">
                      {user?.email}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1.5">
                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="user-dropdown-item"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/create-startup"
                      onClick={() => setDropdownOpen(false)}
                      className="user-dropdown-item"
                    >
                      <Cpu className="w-4 h-4" />
                      <span>Create Workspace</span>
                    </Link>
                  </div>

                  <div className="user-dropdown-divider" />

                  {/* Sign Out */}
                  <div className="py-1.5">
                    <button
                      onClick={handleLogout}
                      className="user-dropdown-item w-full text-left text-neutral-400 hover:text-white hover:bg-neutral-800"
                      id="sign-out-button"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
