import { Link } from 'react-router-dom';

function Layout({ children, theme, onThemeChange, currentUser, onLogout }) {
  return (
    <div className="app-container" role="main">
      <header className="app-header" role="banner">
        <h1>Service Request Management</h1>
        <div className="theme-selector">
          {currentUser && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginRight: '1rem' }}>
              <span style={{ fontWeight: 'bold' }}>Welcome, {currentUser}</span>
              <button 
                onClick={onLogout} 
                style={{ 
                  background: 'var(--danger)', 
                  color: 'white', 
                  padding: '0.4rem 0.8rem', 
                  borderRadius: '8px',
                  fontSize: '0.8rem'
                }}
              >
                Sign Out
              </button>
            </div>
          )}
          <label htmlFor="theme-select">Theme:</label>
          <select id="theme-select" value={theme} onChange={onThemeChange}>
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
            <option value="water">🌊 Deep Water</option>
          </select>
        </div>
      </header>
      <main className="app-main">
        {children}
      </main>
    </div>
  );
}

export default Layout;
