import React from 'react';

const StatusBadge = ({ status }) => {
  const normalized = (status || '').toLowerCase();

  let cls = 'badge ';
  if (normalized === 'pending') cls += 'badge-pending';
  else if (normalized === 'in progress') cls += 'badge-inprogress';
  else if (normalized === 'resolved') cls += 'badge-resolved';
  else cls += 'bg-slate-700 text-slate-200';

  return <span className={cls}>{status}</span>;
};

export default StatusBadge;

