import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, LayoutDashboard, Compass, Layers } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0d1321]/90 backdrop-blur-sm border-b border-slate-800/60 px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-indigo-600/10 p-2 rounded-lg border border-indigo-500/20">
            <Cpu className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">
            StartAI
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Link
            to="/create-startup"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive('/create-startup')
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            Create Workspace
          </Link>
          <Link
            to="/optimize-startup"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive('/optimize-startup')
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
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
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-800/60 border border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>


      </div>
    </nav>
  );
};

export default Navbar;
