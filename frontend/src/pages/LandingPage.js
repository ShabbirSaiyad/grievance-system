import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center mt-4">
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-300 px-3 py-1 border border-emerald-400/30 text-xs">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          AI-assisted grievance routing · Built for citizens
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-50">
          Smart Public Grievance
          <span className="block bg-gradient-to-r from-brand-400 via-emerald-400 to-sky-400 bg-clip-text text-transparent">
            Redressal System
          </span>
        </h1>
        <p className="text-slate-300 text-sm md:text-base max-w-xl">
          File complaints in under a minute, track them in real time, and let our AI route them to
          the right department with the right priority. Designed for hackathons, ready for
          production.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/submit" className="btn-primary">
            Submit a Grievance
          </Link>
          <Link
            to="/track"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition"
          >
            Track with ID
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3 text-xs text-slate-400">
          <div className="glass-card px-3 py-2">
            <div className="text-lg font-bold text-emerald-300">AI</div>
            <div>Smart routing</div>
          </div>
          <div className="glass-card px-3 py-2">
            <div className="text-lg font-bold text-brand-300">Realtime</div>
            <div>Status timeline</div>
          </div>
          <div className="glass-card px-3 py-2">
            <div className="text-lg font-bold text-sky-300">Secure</div>
            <div>Tracking IDs</div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="glass-card p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-100">Live grievance snapshot</h2>
              <p className="text-xs text-slate-400">Example cards you&apos;ll see on dashboard</p>
            </div>
            <span className="badge bg-brand-500/20 text-brand-200 border border-brand-500/50">
              Demo Preview
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Total complaints today</span>
              <span className="font-semibold text-slate-100">27</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-emerald-400 via-yellow-300 to-red-400" />
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            <div className="glass-card p-3 bg-slate-900/80 border-dashed border-slate-700">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300 font-medium">Water leakage near Sector 9</span>
                <span className="badge badge-priority-high">High</span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">
                Continuous water overflow from broken pipeline causing road damage and health risk.
              </p>
              <div className="flex justify-between items-center mt-2 text-[11px] text-slate-500">
                <span>Status: <span className="text-yellow-300">In Progress</span></span>
                <span>Tracking ID: <span className="font-mono">GRV-XXXX-ABCD</span></span>
              </div>
            </div>

            <div className="glass-card p-3">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300 font-medium">Street lights not working</span>
                <span className="badge badge-priority-medium">Medium</span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">
                Multiple lights on main road are off for several weeks, creating safety concerns.
              </p>
              <div className="flex justify-between items-center mt-2 text-[11px] text-slate-500">
                <span>Status: <span className="text-red-400">Pending</span></span>
                <span>Tracking ID: <span className="font-mono">GRV-YYYY-EFGH</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

