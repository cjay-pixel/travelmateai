import { useState } from 'react';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const raw = localStorage.getItem('travelmate_user');
    if (!raw) {
      setError('No account found. Please register first.');
      return;
    }
    const user = JSON.parse(raw);
    if (user.email !== email || user.password !== password) {
      setError('Invalid credentials');
      return;
    }

    localStorage.setItem('travelmate_logged_in', 'true');
    if (onLogin) onLogin(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger py-1">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">Login</button>
      </div>
    </form>
  );
}

export default LoginForm;
