import React, { useEffect, useState } from 'react';
import { getGrievances } from '../api';
import Spinner from '../components/Spinner';
import GrievanceCard from '../components/GrievanceCard';
import { toast } from 'react-toastify';

const GrievanceListPage = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const loadData = async () => {
    setLoading(true);
    try {
      const { data } = await getGrievances();
      setGrievances(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load grievances');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = grievances.filter((g) => {
    if (statusFilter === 'all') return true;
    return g.status === statusFilter;
  });

  const emptyState = !loading && filtered.length === 0;

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">All grievances</h2>
          <p className="text-xs text-slate-400">
            Card-based view of every complaint in the system.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-full bg-slate-900/80 border border-slate-700 px-3 py-1.5 text-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="all">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <button
            onClick={loadData}
            className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition"
          >
            Refresh
          </button>
        </div>
      </div>

      {loading && <Spinner />}

      {emptyState && (
        <div className="glass-card p-8 text-center text-sm text-slate-400">
          <p className="mb-1">No grievances match your filters.</p>
          <p className="text-xs">Try switching to &quot;All statuses&quot; or wait for new cases.</p>
        </div>
      )}

      {!loading && !emptyState && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((g) => (
            <GrievanceCard key={g._id} grievance={g} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GrievanceListPage;

