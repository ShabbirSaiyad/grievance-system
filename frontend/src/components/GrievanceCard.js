import React from 'react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';

const GrievanceCard = ({ grievance }) => {
  return (
    <div className="glass-card p-4 flex flex-col gap-3 hover:-translate-y-1 hover:shadow-2xl transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-slate-400">Tracking ID</div>
          <div className="text-sm font-mono text-slate-100">{grievance.trackingId}</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StatusBadge status={grievance.status} />
          <PriorityBadge priority={grievance.priority} />
        </div>
      </div>

      <div>
        <div className="text-xs text-slate-400 mb-1">Citizen</div>
        <div className="text-sm font-semibold text-slate-100">{grievance.name}</div>
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-slate-400">
        <span className="px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700">
          {grievance.category}
        </span>
        <span className="px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700">
          {grievance.department}
        </span>
      </div>

      <p className="text-sm text-slate-300 line-clamp-3">{grievance.description}</p>

      <div className="flex justify-between items-center text-xs text-slate-500 mt-1">
        <span>Created: {new Date(grievance.createdAt).toLocaleString()}</span>
        {grievance.updatedAt && (
          <span>Updated: {new Date(grievance.updatedAt).toLocaleString()}</span>
        )}
      </div>
    </div>
  );
};

export default GrievanceCard;

