import { useState, useMemo } from 'react';
import RequestCard from '../components/RequestCard';
import RequestForm from '../components/RequestForm';

const priorityOrder = { high: 1, medium: 2, low: 3 };

function RequestsOverview({ requests, onCreateRequest }) {
  const [showForm, setShowForm] = useState(false);
  const [filteredStatus, setFilteredStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('priority-desc');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredAndSortedRequests = useMemo(() => {
    let list = requests;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(req => 
        req.title.toLowerCase().includes(q) || 
        req.description.toLowerCase().includes(q) || 
        req.category.toLowerCase().includes(q)
      );
    }

    if (filteredStatus !== 'all') {
      list = list.filter(req => req.status === filteredStatus);
    }

    list = [...list].sort((a, b) => {
      if (sortBy === 'priority-desc') {
        const pa = priorityOrder[a.priority] ?? 99;
        const pb = priorityOrder[b.priority] ?? 99;
        if (pa !== pb) return pa - pb;
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'priority-asc') {
        const pa = priorityOrder[a.priority] ?? 99;
        const pb = priorityOrder[b.priority] ?? 99;
        if (pa !== pb) return pb - pa;
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === 'date-desc') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'date-asc') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });

    return list;
  }, [requests, filteredStatus, searchQuery, sortBy]);

  const handleCreateRequest = async (formData) => {
    setIsSubmitting(true);
    await onCreateRequest(formData);
    setIsSubmitting(false);
    setShowForm(false);
  };

  return (
    <div className="overview-page">
      <header className="page-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
        <div className="page-title" style={{ marginBottom: '1rem' }}>
          📋 Service Requests ({filteredAndSortedRequests.length})
        </div>

        <div className="controls-right" style={{ width: '100%', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', gap: '1rem', width: '100%', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              placeholder="🔍 Search titles, descriptions, categories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, minWidth: '250px', padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', cursor: 'pointer' }}
            >
              <option value="priority-desc">Sort: Priority (High to Low)</option>
              <option value="priority-asc">Sort: Priority (Low to High)</option>
              <option value="date-desc">Sort: Date (Newest first)</option>
              <option value="date-asc">Sort: Date (Oldest first)</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div className="status-filter" role="radiogroup" aria-label="Filter by status" style={{ flexWrap: 'wrap' }}>
              <label><input type="radio" name="status" value="all" checked={filteredStatus === 'all'} onChange={(e) => setFilteredStatus(e.target.value)} /> All</label>
              <label><input type="radio" name="status" value="pending" checked={filteredStatus === 'pending'} onChange={(e) => setFilteredStatus(e.target.value)} /> Pending</label>
              <label><input type="radio" name="status" value="in-progress" checked={filteredStatus === 'in-progress'} onChange={(e) => setFilteredStatus(e.target.value)} /> In Progress</label>
              <label><input type="radio" name="status" value="resolved" checked={filteredStatus === 'resolved'} onChange={(e) => setFilteredStatus(e.target.value)} /> Resolved</label>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              aria-expanded={showForm}
              className={showForm ? 'cancel-btn' : 'new-request-btn'}
            >
              {showForm ? '❌ Cancel' : '➕ New Request'}
            </button>
          </div>
        </div>
      </header>

      {showForm && (
        <section aria-label="Create New Request">
          <div
            className="form-header-toggle"
            onClick={() => setShowForm(false)}
          >
            ➕ Create New Request
          </div>
          <RequestForm onSubmit={handleCreateRequest} />
          {isSubmitting && (
            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Saving request…
            </p>
          )}
        </section>
      )}

      <section className="requests-list" aria-label="Service requests list">
        {filteredAndSortedRequests.length ? (
          filteredAndSortedRequests.map(request => (
            <RequestCard key={request.id} request={request} />
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
            <h3>📭 No requests</h3>
            <p>No requests match the selected search or filter. Create one above!</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default RequestsOverview;
