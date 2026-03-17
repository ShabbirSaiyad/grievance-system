import React from 'react';

const PriorityBadge = ({ priority }) => {
  const normalized = (priority || '').toLowerCase();
  let cls = 'badge ';

  if (normalized === 'high') cls += 'badge-priority-high';
  else if (normalized === 'medium') cls += 'badge-priority-medium';
  else cls += 'badge-priority-low';

  return <span className={cls}>{priority}</span>;
};

export default PriorityBadge;

