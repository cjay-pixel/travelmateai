import { useState } from 'react';

function RegisterForm({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferences, setPreferences] = useState({ beach: false, mountain: false, city: false, nature: false });
  const [budget, setBudget] = useState(3000);
  const [duration, setDuration] = useState(3);
  const [error, setError] = useState('');

  const togglePref = (key) => {
    setPreferences((p) => ({ ...p, [key]: !p[key] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill name, email and password.');
      return;
    }

    // Check if account already exists with this email
    const existingUser = localStorage.getItem('travelmate_user');
    if (existingUser) {
      const parsedUser = JSON.parse(existingUser);
      if (parsedUser.email === email) {
        setError('An account with this email already exists. Please login instead.');
        return;
      }
    }

    const user = {
      name,
      email,
      password,
      preferences: Object.keys(preferences).filter((k) => preferences[k]),
      budget,
      duration,
      createdAt: new Date().toISOString(),
    };

    // persist user (simple demo) - in real app use backend
    localStorage.setItem('travelmate_user', JSON.stringify(user));
    localStorage.setItem('travelmate_logged_in', 'true');

    if (onRegister) onRegister(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger py-1">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label d-block">Travel Preferences</label>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="prefBeach" checked={preferences.beach} onChange={() => togglePref('beach')} />
          <label className="form-check-label" htmlFor="prefBeach">Beach</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="prefMountain" checked={preferences.mountain} onChange={() => togglePref('mountain')} />
          <label className="form-check-label" htmlFor="prefMountain">Mountain</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="prefCity" checked={preferences.city} onChange={() => togglePref('city')} />
          <label className="form-check-label" htmlFor="prefCity">City</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="prefNature" checked={preferences.nature} onChange={() => togglePref('nature')} />
          <label className="form-check-label" htmlFor="prefNature">Nature</label>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label d-block">Budget: ₱{budget}</label>
        <input type="range" min="500" max="10000" step="100" className="form-range" value={budget} onChange={(e) => setBudget(Number(e.target.value))} />
      </div>

      <div className="mb-3">
        <label className="form-label">Trip Duration (days)</label>
        <select className="form-select" value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
          {[1,2,3,4,5,7,10,14].map((d) => (
            <option key={d} value={d}>{d} day{d>1? 's':''}</option>
          ))}
        </select>
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">Create profile</button>
      </div>
    </form>
  );
}

export default RegisterForm;
