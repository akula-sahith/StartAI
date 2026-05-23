import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, LayoutDashboard, Compass, Layers } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 opacity-70 blur-sm group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-slate-950 p-2 rounded-lg border border-slate-800">
              <Cpu className="w-5 h-5 text-blue-400 group-hover:text-purple-400 transition-colors" />
            </div>
          </div>
          <span className="font-bold text-xl tracking-wider bg-gradient-to-r from-blue-400 via-indigo-200 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition duration-300">
            STARTUP OS
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Link
            to="/create-startup"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive('/create-startup')
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            Create Workspace
          </Link>
          <Link
            to="/optimize-startup"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive('/optimize-startup')
                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            Optimize Workspace
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            isActive('/dashboard')
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/15 border border-blue-400/20'
              : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-850 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard Cockpit</span>
        </Link>

        {/* Live operational indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          SECURE AGENT NODE
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
