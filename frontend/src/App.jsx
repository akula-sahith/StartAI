import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import CreateStartup from './pages/CreateStartup';
import OptimizeStartup from './pages/OptimizeStartup';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0f1a] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-white antialiased">
        <Navbar />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create-startup" element={<CreateStartup />} />
            <Route path="/optimize-startup" element={<OptimizeStartup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="w-full border-t border-slate-800/60 bg-[#0d1321] py-6 text-center text-xs text-slate-500 tracking-wide">
          © {new Date().getFullYear()} StartAI — AI-Powered Operations Platform
        </footer>
      </div>
    </Router>
  );
}

export default App;
