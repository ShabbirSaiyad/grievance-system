import React, { useEffect, useState } from 'react';
import { getGrievances } from '../api';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, Tooltip, Legend);

const DashboardPage = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data } = await getGrievances();
      setGrievances(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const total = grievances.length;
  const pending = grievances.filter((g) => g.status === 'Pending').length;
  const inProgress = grievances.filter((g) => g.status === 'In Progress').length;
  const resolved = grievances.filter((g) => g.status === 'Resolved').length;

  const high = grievances.filter((g) => g.priority === 'High').length;
  const medium = grievances.filter((g) => g.priority === 'Medium').length;
  const low = grievances.filter((g) => g.priority === 'Low').length;

  const emptyState = !loading && grievances.length === 0;

  const statusBarData = {
    labels: ['Pending', 'In Progress', 'Resolved'],
    datasets: [
      {
        label: 'Grievances',
        data: [pending, inProgress, resolved],
        backgroundColor: ['#f97373', '#facc15', '#22c55e']
      }
    ]
  };

  const priorityDoughnutData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        data: [high, medium, low],
        backgroundColor: ['#f97373', '#facc15', '#38bdf8']
      }
    ]
  };

  return (
    <div className="mt-4 space-y-6">
      <div className="flex justify-between items-center gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">Operations dashboard</h2>
          <p className="text-xs text-slate-400">
            Monitor the health of your grievance pipeline at a glance.
          </p>
        </div>
        <button
          onClick={loadData}
          className="inline-flex items-center rounded-full border border-slate-700 px-4 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition"
        >
          Refresh data
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="glass-card p-4 flex flex-col gap-1">
          <span className="text-xs text-slate-400">Total complaints</span>
          <span className="text-2xl font-bold text-slate-50">{total}</span>
          <span className="text-[11px] text-slate-500">All-time in the system</span>
        </div>
        <div className="glass-card p-4 flex flex-col gap-1">
          <span className="text-xs text-red-300">Pending</span>
          <span className="text-2xl font-bold text-red-400">{pending}</span>
          <span className="text-[11px] text-slate-500">Awaiting action</span>
        </div>
        <div className="glass-card p-4 flex flex-col gap-1">
          <span className="text-xs text-yellow-200">In Progress</span>
          <span className="text-2xl font-bold text-yellow-300">{inProgress}</span>
          <span className="text-[11px] text-slate-500">Being resolved</span>
        </div>
        <div className="glass-card p-4 flex flex-col gap-1">
          <span className="text-xs text-emerald-200">Resolved</span>
          <span className="text-2xl font-bold text-emerald-300">{resolved}</span>
          <span className="text-[11px] text-slate-500">Closed successfully</span>
        </div>
      </div>

      {loading && <Spinner />}

      {emptyState && (
        <div className="glass-card p-8 text-center text-sm text-slate-400">
          <p className="mb-1">No grievances have been submitted yet.</p>
          <p className="text-xs">
            Once citizens start filing complaints, you&apos;ll see live charts and metrics here.
          </p>
        </div>
      )}

      {!loading && !emptyState && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold text-slate-100 mb-2">
              Status distribution
            </h3>
            <Bar
              data={statusBarData}
              options={{
                plugins: {
                  legend: { labels: { color: '#9ca3af', font: { size: 10 } } }
                },
                scales: {
                  x: { ticks: { color: '#9ca3af', font: { size: 10 } }, grid: { color: '#1f2937' } },
                  y: { ticks: { color: '#9ca3af', font: { size: 10 } }, grid: { color: '#1f2937' } }
                }
              }}
            />
          </div>

          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold text-slate-100 mb-2">
              Priority mix
            </h3>
            <Doughnut
              data={priorityDoughnutData}
              options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { color: '#9ca3af', font: { size: 10 } }
                  }
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;

