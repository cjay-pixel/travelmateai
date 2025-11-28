import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AuthModal({ show, onClose, onLogin, onRegister, onSkip }) {
  const [mode, setMode] = useState('login');

  useEffect(() => {
    if (show) setMode('login');
  }, [show]);

  if (!show) return null;

  const handleSkip = () => {
    localStorage.setItem('travelmate_skipped', 'true');
    if (onSkip) onSkip();
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 2000 }}>
      <div className="bg-dark bg-opacity-50 position-absolute w-100 h-100" onClick={onClose}></div>

      <div className="card shadow-lg" style={{ width: 'min(720px, 96%)', zIndex: 2100 }}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Welcome to TravelMate AI</h5>
            <div>
              <button className="btn btn-sm btn-link text-secondary" onClick={onClose}>Close</button>
            </div>
          </div>

          <div className="d-flex gap-2 mb-3">
            <button className={`btn btn-outline-secondary ${mode === 'login' ? 'active' : ''}`} onClick={() => setMode('login')}>Login</button>
            <button className={`btn btn-outline-secondary ${mode === 'register' ? 'active' : ''}`} onClick={() => setMode('register')}>Register</button>
            <div className="ms-auto">
              <button className="btn btn-sm btn-link" onClick={handleSkip}>Skip for now</button>
            </div>
          </div>

          <div>
            {mode === 'login' ? (
              <LoginForm onLogin={(user) => { if (onLogin) onLogin(user); if (onClose) onClose(); }} />
            ) : (
              <RegisterForm onRegister={(user) => { if (onRegister) onRegister(user); if (onClose) onClose(); }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
