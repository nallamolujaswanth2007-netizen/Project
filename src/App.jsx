import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import RequestsOverview from './pages/RequestsOverview';
import RequestDetail from './pages/RequestDetail';
import Login from './pages/Login';
import { requestsData, updateRequestStatus, generateId } from './data/requestsData';

function App() {
  const [requests, setRequests] = useState(requestsData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  // THEME
  const [theme, setTheme] = useState('water');

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleLogin = (username) => {
    setCurrentUser(username);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser('');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRequests(prev => prev.map(req => ({
        ...req,
        updatedAt: new Date().toISOString()
      })));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setRequests(prev => updateRequestStatus(prev, id, newStatus));
  };

  const handleCreateRequest = async (formData) => {
    // simulate async submit
    await new Promise(resolve => setTimeout(resolve, 700));

    const now = new Date().toISOString();
    const newRequest = {
      id: generateId(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      priority: formData.priority,
      status: 'pending',     // new requests always start as pending
      createdAt: now,
      updatedAt: now,
    };

    setRequests(prev => [newRequest, ...prev]);
  };

  return (
    <div data-theme={theme}>
      {!isAuthenticated ? (
        <Layout theme={theme} onThemeChange={handleThemeChange}>
          <Routes>
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          </Routes>
        </Layout>
      ) : (
        <Layout theme={theme} onThemeChange={handleThemeChange} currentUser={currentUser} onLogout={handleLogout}>
          <Routes>
          <Route
            path="/"
            element={
              <RequestsOverview
                requests={requests}
                onCreateRequest={handleCreateRequest}
              />
            }
          />
          <Route
            path="/request/:id"
            element={
              <RequestDetail
                requests={requests}
                onStatusUpdate={handleStatusUpdate}
              />
            }
          />
            <Route path="*" element={<RequestsOverview requests={requests} onCreateRequest={handleCreateRequest} />} />
          </Routes>
        </Layout>
      )}
    </div>
  );
}

export default App;
