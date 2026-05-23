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
      <div className="min-h-screen bg-[#020617] text-slate-50 flex flex-col font-sans selection:bg-blue-500/30 selection:text-white antialiased">
        {/* Sleek Enterprise Top Bar */}
        <Navbar />

        {/* Primary Page Cockpit */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create-startup" element={<CreateStartup />} />
            <Route path="/optimize-startup" element={<OptimizeStartup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global telemetry footer */}
        <footer className="w-full border-t border-slate-900 bg-slate-950/40 py-6 text-center text-[10px] font-mono text-slate-655 text-slate-600 tracking-wider">
          © {new Date().getFullYear()} STARTUP OS COGNITIVE RUNTIME ENGINE // ALL SYSTEMS SECURE.
        </footer>
      </div>
    </Router>
  );
}

export default App;
