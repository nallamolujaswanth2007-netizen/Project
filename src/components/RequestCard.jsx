import { Link } from 'react-router-dom';
import StatusIndicator from './StatusIndicator';

function RequestCard({ request }) {
  const categoryIcons = {
    'it-support': '🌐',
    'facility': '🏢',
    'maintenance': '🔧',
    'hr': '👥',
    'finance': '💰'
  };
  const icon = categoryIcons[request.category] || '📁';

  return (
    <article className={`request-card status-${request.status}`} role="article" tabIndex={0}>
      <div className="card-header-row">
        <h3 className="request-title">
          {icon} <Link to={`/request/${request.id}`} aria-label={`View details for ${request.title}`}>
            {request.title}
          </Link>
        </h3>
        <StatusIndicator status={request.status} />
      </div>

      <div className="card-meta">
        <span className={`priority-badge priority-${request.priority}`}>
          {request.priority.toUpperCase()}
        </span>
        <span className="category">{request.category.replace('-', ' ').toUpperCase()}</span>
        <time dateTime={request.createdAt}>
          {new Date(request.createdAt).toLocaleDateString()}
        </time>
      </div>

      <p className="request-description">{request.description.substring(0, 120)}...</p>
    </article>
  );
}

export default RequestCard;
