import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LandingPage from './pages/LandingPage';
import GrievanceFormPage from './pages/GrievanceFormPage';
import DashboardPage from './pages/DashboardPage';
import GrievanceListPage from './pages/GrievanceListPage';
import TrackStatusPage from './pages/TrackStatusPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
        <header className="border-b border-slate-800/80 backdrop-blur bg-slate-950/70 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-brand-500 to-emerald-400 flex items-center justify-center text-white text-lg font-black shadow-lg shadow-brand-500/50">
                S
              </div>
              <div>
                <div className="text-sm font-semibold tracking-wide uppercase text-slate-200">
                  Smart Public Grievance
                </div>
                <div className="text-xs text-slate-400">Citizen-first resolution platform</div>
              </div>
            </Link>
            <nav className="flex items-center gap-3 text-sm">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full transition ${
                    isActive
                      ? 'bg-slate-800 text-slate-50'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/submit"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full transition ${
                    isActive
                      ? 'bg-brand-500 text-white'
                      : 'text-slate-300 hover:bg-brand-500/90 hover:text-white'
                  }`
                }
              >
                Submit
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full transition ${
                    isActive
                      ? 'bg-slate-800 text-slate-50'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/grievances"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full transition ${
                    isActive
                      ? 'bg-slate-800 text-slate-50'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`
                }
              >
                All Cases
              </NavLink>
              <NavLink
                to="/track"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full transition ${
                    isActive
                      ? 'bg-slate-800 text-slate-50'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`
                }
              >
                Track
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-6 space-y-8">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/submit" element={<GrievanceFormPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/grievances" element={<GrievanceListPage />} />
            <Route path="/track" element={<TrackStatusPage />} />
          </Routes>
        </main>

        <footer className="border-t border-slate-800/80 mt-8">
          <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-slate-500 flex justify-between">
            <span>© {new Date().getFullYear()} Smart Public Grievance System</span>
            <span>Built with MERN + Tailwind</span>
          </div>
        </footer>
      </div>
      <ToastContainer position="top-right" theme="dark" />
    </Router>
  );
}

export default App;

