import React, { useState } from 'react';
import { getGrievanceByTrackingId, submitFeedback, submitAppeal } from '../api';
import Spinner from '../components/Spinner';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import { toast } from 'react-toastify';

const statusSteps = ['Pending', 'In Progress', 'Resolved'];

const TrackStatusPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [grievance, setGrievance] = useState(null);

  const [feedback, setFeedback] = useState({ rating: 5, comments: '' });
  const [appealReason, setAppealReason] = useState('');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [submittingAppeal, setSubmittingAppeal] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    setGrievance(null);
    try {
      const { data } = await getGrievanceByTrackingId(trackingId.trim());
      setGrievance(data);
      toast.success('Grievance found');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Grievance not found');
    } finally {
      setLoading(false);
    }
  };

  const currentStepIndex = grievance
    ? statusSteps.indexOf(grievance.status || 'Pending')
    : 0;

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!grievance) return;
    setSubmittingFeedback(true);
    try {
      await submitFeedback({
        trackingId: grievance.trackingId,
        rating: feedback.rating,
        comments: feedback.comments
      });
      toast.success('Feedback submitted');
      setFeedback({ rating: 5, comments: '' });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const handleAppealSubmit = async (e) => {
    e.preventDefault();
    if (!grievance || !appealReason.trim()) return;
    setSubmittingAppeal(true);
    try {
      await submitAppeal({
        trackingId: grievance.trackingId,
        reason: appealReason
      });
      toast.success('Appeal submitted');
      setAppealReason('');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to submit appeal');
    } finally {
      setSubmittingAppeal(false);
    }
  };

  return (
    <div className="mt-4 grid md:grid-cols-[1.3fr,1.7fr] gap-6 items-start">
      <section className="glass-card p-6">
        <h2 className="text-lg font-semibold text-slate-50 mb-2">Track your grievance</h2>
        <p className="text-xs text-slate-400 mb-4">
          Enter your tracking ID to view live status, priority, and submit feedback or appeals.
        </p>

        <form onSubmit={handleSearch} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Tracking ID
            </label>
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="e.g. GRV-ABC123-XYZ9"
              className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full justify-center"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Track status'}
          </button>
        </form>

        {!loading && !grievance && (
          <div className="mt-6 text-xs text-slate-400">
            Haven&apos;t filed a grievance yet? Use the{' '}
            <span className="text-brand-300 font-semibold">Submit</span> page to raise your first
            complaint.
          </div>
        )}
      </section>

      <section className="space-y-4">
        {loading && <Spinner />}

        {!loading && grievance && (
          <>
            <div className="glass-card p-5">
              <div className="flex justify-between items-start gap-3 mb-3">
                <div>
                  <div className="text-xs text-slate-400">Tracking ID</div>
                  <div className="font-mono text-sm text-slate-50">
                    {grievance.trackingId}
                  </div>
                  <div className="mt-2 text-xs text-slate-400">
                    Citizen: <span className="text-slate-100">{grievance.name}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={grievance.status} />
                  <PriorityBadge priority={grievance.priority} />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 mb-3">
                <span className="px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700">
                  {grievance.category}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700">
                  {grievance.department}
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-3">
                {grievance.description}
              </p>

              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Created: {new Date(grievance.createdAt).toLocaleString()}</span>
                {grievance.updatedAt && (
                  <span>Updated: {new Date(grievance.updatedAt).toLocaleString()}</span>
                )}
              </div>
            </div>

            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold text-slate-100 mb-3">
                Status timeline
              </h3>
              <div className="flex items-center justify-between gap-2">
                {statusSteps.map((step, index) => {
                  const isActive = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  return (
                    <div key={step} className="flex-1 flex flex-col items-center">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 ${
                          isActive
                            ? 'border-emerald-400 bg-emerald-500/10 text-emerald-200'
                            : 'border-slate-700 bg-slate-900 text-slate-500'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="mt-1 text-[11px] text-center text-slate-300">{step}</div>
                      {isCurrent && (
                        <div className="mt-0.5 text-[10px] text-emerald-300 uppercase tracking-wide">
                          Current
                        </div>
                      )}
                      {index < statusSteps.length - 1 && (
                        <div className="hidden md:block h-px bg-gradient-to-r from-slate-600 via-slate-700 to-slate-600 w-full mt-4" />
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-[11px] text-slate-400">
                Once your grievance is marked <span className="text-emerald-300">Resolved</span>,
                you&apos;ll be able to submit feedback and, if needed, file an appeal.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <form onSubmit={handleFeedbackSubmit} className="glass-card p-5 space-y-3">
                <h3 className="text-sm font-semibold text-slate-100">Feedback</h3>
                <p className="text-[11px] text-slate-400">
                  Rate how satisfied you are with the resolution of this grievance.
                </p>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Rating (1 = poor, 5 = excellent)
                  </label>
                  <select
                    value={feedback.rating}
                    onChange={(e) =>
                      setFeedback((prev) => ({ ...prev, rating: Number(e.target.value) }))
                    }
                    className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {[1, 2, 3, 4, 5].map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Comments (optional)
                  </label>
                  <textarea
                    value={feedback.comments}
                    onChange={(e) =>
                      setFeedback((prev) => ({ ...prev, comments: e.target.value }))
                    }
                    rows={3}
                    className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="Share anything that went particularly well or poorly."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submittingFeedback}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submittingFeedback ? 'Submitting...' : 'Submit feedback'}
                </button>
              </form>

              <form onSubmit={handleAppealSubmit} className="glass-card p-5 space-y-3">
                <h3 className="text-sm font-semibold text-slate-100">Appeal</h3>
                <p className="text-[11px] text-slate-400">
                  If you believe your grievance has not been resolved satisfactorily, file an appeal.
                </p>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Reason for appeal
                  </label>
                  <textarea
                    value={appealReason}
                    onChange={(e) => setAppealReason(e.target.value)}
                    rows={4}
                    required
                    className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="Explain why you are not satisfied with the current resolution."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submittingAppeal}
                  className="inline-flex items-center justify-center rounded-full border border-red-500/60 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-200 hover:bg-red-500/20 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submittingAppeal ? 'Submitting appeal...' : 'Submit appeal'}
                </button>
                <p className="text-[10px] text-slate-500 mt-1">
                  Appeals are reviewed by a higher authority. You&apos;ll be notified through this
                  portal when the decision is updated.
                </p>
              </form>
            </div>
          </>
        )}

        {!loading && !grievance && (
          <div className="glass-card p-6 text-xs text-slate-400">
            <p className="mb-1">Enter a tracking ID to view a live grievance timeline.</p>
            <p>
              Status colors: <span className="text-red-400 font-medium">Pending</span>,{' '}
              <span className="text-yellow-300 font-medium">In Progress</span>,{' '}
              <span className="text-emerald-300 font-medium">Resolved</span>.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default TrackStatusPage;

