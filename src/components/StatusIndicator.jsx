const statusConfig = {
  pending: { label: '⏳ Pending', className: 'pending' },
  'in-progress': { label: '🔄 In Progress', className: 'in-progress' },
  resolved: { label: '✅ Resolved', className: 'resolved' }
};

function StatusIndicator({ status }) {
  const config = statusConfig[status] || statusConfig.pending;
  return (
    <span
      className={`status-pill ${config.className}`}
      role="status"
      aria-label={`Status: ${config.label}`}
    >
      {config.label}
    </span>
  );
}

export default StatusIndicator;
