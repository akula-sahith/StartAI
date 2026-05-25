import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Navbar from './components/Navbar';

import LandingPage from './pages/LandingPage';

import CreateStartup from './pages/CreateStartup';

import OptimizeStartup from './pages/OptimizeStartup';

import Dashboard from './pages/Dashboard';

import Login from './pages/Login';

import SignUp from './pages/SignUp';

import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

function App() {

  return (

    <Router>

      <div className="min-h-screen bg-black text-neutral-200 flex flex-col font-sans selection:bg-white/20 selection:text-white antialiased">

        <Navbar />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">

          <Routes>

            {/* PUBLIC ROUTES */}

            <Route path="/" element={<LandingPage />} />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<SignUp />} />

            {/* PROTECTED ROUTES */}

            <Route
              path="/create-startup"
              element={
                <ProtectedRoute>
                  <CreateStartup />
                </ProtectedRoute>
              }
            />

            <Route
              path="/optimize-startup"
              element={
                <ProtectedRoute>
                  <OptimizeStartup />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* FALLBACK */}

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Routes>

        </main>

        <footer className="w-full border-t border-neutral-800 bg-black py-6 text-center text-xs text-neutral-600 tracking-wide">

          © {new Date().getFullYear()} StartAI — AI-Powered Operations Platform

        </footer>

      </div>

    </Router>
  );
}

export default App;