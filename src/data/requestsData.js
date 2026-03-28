export const requestsData = [
  {
    id: '1',
    title: '🌐 Network connectivity issue in Lab 204',
    description: 'Users cannot access shared drives. Started after recent Windows update. Affects 15+ users.',
    category: 'it-support',
    priority: 'high',
    status: 'pending',          // pending | in-progress | resolved
    createdAt: '2026-02-20T09:30:00Z',
    updatedAt: '2026-02-20T09:30:00Z'
  },
  {
    id: '2',
    title: '📽️ Broken projector in Conference Room A',
    description: 'HDMI input not working. Need replacement or repair. Critical for daily meetings.',
    category: 'maintenance',
    priority: 'medium',
    status: 'in-progress',
    createdAt: '2026-02-21T14:15:00Z',
    updatedAt: '2026-02-22T10:00:00Z'
  },
  {
    id: '3',
    title: '🪑 New desk chair request - Employee #456',
    description: 'Ergonomic chair needed due to chronic back pain. Doctor recommendation provided.',
    category: 'facility',
    priority: 'low',
    status: 'resolved',
    createdAt: '2026-02-19T16:45:00Z',
    updatedAt: '2026-02-22T09:00:00Z'
  },
  {
    id: '4',
    title: '👥 Hiring request for new developer',
    description: 'Need to open a new req for a senior backend engineer. Expanding the core team.',
    category: 'hr',
    priority: 'high',
    status: 'pending',
    createdAt: '2026-03-27T10:00:00Z',
    updatedAt: '2026-03-27T10:00:00Z'
  },
  {
    id: '5',
    title: '💰 Budget approval for Q3 marketing',
    description: 'Campaign budget needs final sign-off before vendor execution.',
    category: 'finance',
    priority: 'medium',
    status: 'in-progress',
    createdAt: '2026-03-26T14:30:00Z',
    updatedAt: '2026-03-27T08:15:00Z'
  }
];

// helper to update status (used in App.jsx / RequestDetail)
export const updateRequestStatus = (requests, id, newStatus) => {
  return requests.map(req => 
    req.id === id 
      ? { ...req, status: newStatus, updatedAt: new Date().toISOString() }
      : req
  );
};

// helper to generate simple IDs
export const generateId = () => Date.now().toString();

// priority order: high → medium → low
const priorityOrder = {
  high: 1,
  medium: 2,
  low: 3,
};

// sort by status filter and priority
export const sortRequestsByPriority = (requests) => {
  return [...requests].sort((a, b) => {
    const pa = priorityOrder[a.priority] ?? 99;
    const pb = priorityOrder[b.priority] ?? 99;
    if (pa !== pb) return pa - pb;
    // tie-breaker: newer first
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};
