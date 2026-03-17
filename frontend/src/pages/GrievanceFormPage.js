import React, { useState } from 'react';
import { createGrievance } from '../api';
import { toast } from 'react-toastify';

const GrievanceFormPage = () => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    department: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState(null);
  const [trackingId, setTrackingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTrackingId(null);
    setAiSummary(null);

    try {
      console.log("forma:", form)
      const { data } = await createGrievance(form);
      toast.success('Grievance submitted successfully');
      setTrackingId(data.grievance.trackingId);
      setAiSummary(data.aiSummary);
      setForm({
        name: '',
        category: '',
        department: '',
        description: ''
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to submit grievance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 grid md:grid-cols-[2fr,1.2fr] gap-6 items-start">
      <section className="glass-card p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-50">Submit a new grievance</h2>
            <p className="text-xs text-slate-400">
              Our AI will help route it to the right department with an appropriate priority.
            </p>
          </div>
          <span className="badge bg-slate-800 text-slate-300 border border-slate-700">
            Step 1 · File
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Your name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="Enter your full name"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Preferred category (optional)
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="">Let AI decide</option>
                <option value="Water Department">Water Department</option>
                <option value="Electricity Department">Electricity Department</option>
                <option value="Roads and Transport">Roads and Transport</option>
                <option value="Sanitation">Sanitation</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Specific department (optional)
              </label>
              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="e.g. Ward 12 Water Board"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Describe your grievance
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="Describe the issue, location, and impact. Mention if it is urgent or dangerous."
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Tip: Use words like &quot;urgent&quot; or &quot;danger&quot; for high priority issues.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit grievance'}
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-slate-100 mb-2">AI insights</h3>
          <p className="text-xs text-slate-400 mb-3">
            We use a combination of keyword rules and optional OpenAI classification (if configured
            on the backend) to assign category and priority.
          </p>
          <ul className="text-xs text-slate-300 space-y-1">
            <li>
              <span className="font-semibold text-slate-100">Category hints:</span> &quot;water&quot;,
              &quot;pipeline&quot; → Water · &quot;electric&quot; → Electricity · &quot;road&quot;,
              &quot;pothole&quot; → Road
            </li>
            <li>
              <span className="font-semibold text-slate-100">Priority hints:</span> &quot;urgent&quot;,
              &quot;danger&quot;, &quot;accident&quot; → High · long pending → Medium · else Low
            </li>
          </ul>
        </div>

        {trackingId && (
          <div className="glass-card p-5 border-brand-500/60 border">
            <h3 className="text-sm font-semibold text-emerald-300 mb-2">
              Grievance submitted successfully!
            </h3>
            <p className="text-xs text-slate-300 mb-1">
              Your tracking ID is:
            </p>
            <p className="font-mono text-sm text-slate-50 bg-slate-900/80 rounded-lg px-3 py-2 mb-3">
              {trackingId}
            </p>
            <p className="text-xs text-slate-400">
              Use this ID any time on the Track page to view the live status, provide feedback, or
              file an appeal.
            </p>
          </div>
        )}

        {aiSummary && (
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-brand-300 mb-1">
              AI-generated summary
            </h3>
            <p className="text-xs text-slate-300">{aiSummary}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default GrievanceFormPage;

