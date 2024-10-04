import React, { Suspense, lazy, useState } from 'react';
import './style.css'; // Import the CSS styles

const Dashboard = lazy(() => import('dashboardApp/dashboard')); // Adjust to match exposed name
const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [user,setUser] = useState()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = credentials;

    if (username === 'admin' && password === 'password') {
      setUser(user)
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <div className="container">
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {user ? (
          <Suspense fallback={<div>DashboardLoading....</div>} >
            <Dashboard />
          </Suspense>
        )  : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
              <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        )}
      </div>
    </div>
  );
};

export default Login;
