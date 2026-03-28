import { useState } from 'react';

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({ email: '', confirmPassword: '', general: '' });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ email: '', confirmPassword: '', general: '' });
    
    if (isLogin) {
      if (username && password) {
        onLogin(username); // authentication
      } else {
        setErrors(prev => ({ ...prev, general: 'Please enter both username and password.' }));
      }
    } else {
      let hasError = false;
      const newErrors = { email: '', confirmPassword: '', general: '' };

      if (!validateEmail(email)) {
        newErrors.email = 'Please enter a valid email address.';
        hasError = true;
      }
      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match!';
        hasError = true;
      }
      
      if (hasError) {
        setErrors(newErrors);
        return;
      }

      if (username && email && password) {
        onLogin(fullName || username); // registration, prioritizing full name
      }
    }
  };

  return (
    <div className="login-container">
      <div className="request-card" style={{ width: '100%', maxWidth: '450px' }}>
        <h2 className="request-title" style={{ marginBottom: '1.5rem', justifyContent: 'center' }}>
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        
        {errors.general && (
          <div style={{ background: 'var(--danger)', color: 'white', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center', fontWeight: 'bold' }}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="request-form" style={{ padding: '0', marginBottom: '1rem', border: 'none', background: 'transparent', boxShadow: 'none' }}>
          
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter username"
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
                style={{ borderColor: errors.email ? 'var(--danger)' : '' }}
              />
              {errors.email && <div style={{ color: 'var(--danger)', fontSize: '0.85rem', marginTop: '0.4rem', fontWeight: 'bold' }}>{errors.email}</div>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
                style={{ borderColor: errors.confirmPassword ? 'var(--danger)' : '' }}
              />
              {errors.confirmPassword && <div style={{ color: 'var(--danger)', fontSize: '0.85rem', marginTop: '0.4rem', fontWeight: 'bold' }}>{errors.confirmPassword}</div>}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <input 
              type="checkbox" 
              id="showPassword" 
              checked={showPassword} 
              onChange={() => setShowPassword(!showPassword)} 
              style={{ width: 'auto', cursor: 'pointer' }}
            />
            <label htmlFor="showPassword" style={{ margin: 0, fontSize: '0.9rem', cursor: 'pointer' }}>Show Password</label>
          </div>

          <button type="submit" className="submit-btn" style={{ width: '100%' }}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors({ email: '', confirmPassword: '', general: '' });
            }}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--info)', 
              cursor: 'pointer', 
              padding: 0,
              fontWeight: 'bold',
              textDecoration: 'underline'
            }}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
