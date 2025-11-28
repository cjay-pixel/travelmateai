import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdFavoriteBorder } from 'react-icons/md';
import AuthModal from './AuthModal';

function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem('travelmate_user');
    const logged = localStorage.getItem('travelmate_logged_in') === 'true';
    setUser(logged && raw ? JSON.parse(raw) : null);

    const onAuthChanged = () => {
      const r = localStorage.getItem('travelmate_user');
      const l = localStorage.getItem('travelmate_logged_in') === 'true';
      setUser(l && r ? JSON.parse(r) : null);
    };

    window.addEventListener('travelmate:auth-changed', onAuthChanged);
    return () => window.removeEventListener('travelmate:auth-changed', onAuthChanged);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className={`sticky-top bg-white ${isScrolled ? 'shadow' : ''}`} style={{top: 0, zIndex: 1020}}>
      <nav className="navbar navbar-expand-md navbar-light px-3 px-md-4">
        <div className="container-fluid" style={{ position: 'relative' }}>
          {/* Logo */}
          <a className="navbar-brand" href="/">
            <img 
              src="/Images/travelmate-ai.svg" 
              alt="travelmate" 
              height="40"
            />
          </a>

          {/* Search Bar - Hidden on mobile; centered */}
          <form
            className="d-none d-md-flex justify-content-center mx-3"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1030,
            }}
            onSubmit={handleSearch}
          >
            <div className={`input-group rounded-pill bg-light border border-1 px-3 py-2 ${searchOpen ? 'border-secondary' : 'border-secondary'}`} style={{ maxWidth: '480px', width: '100%' }}>
              <input
                type="text"
                className="form-control border-0 bg-light"
                placeholder="Where are you going?"
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setSearchOpen(false)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{outline: 'none'}}
              />
              <button className="btn btn-link text-secondary p-0" type="submit">
                <IoSearch size={18} />
              </button>
            </div>
          </form>

          {/* Navbar Toggle */}
          <button 
            className="navbar-toggler border-0" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto ms-3 ms-md-0">
              <li className="nav-item">
                <a className="nav-link" href="/recommendations">Explore</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/itinerary-builder">Build Trip</a>
              </li>
            </ul>
            <div className="ms-auto d-flex align-items-center gap-3" style={{ position: 'relative' }}>
              <HeaderAccountButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Search Bar Expanded (shown when scrolled) */}
      {isScrolled && (
        <div className="bg-white border-top border-1 py-3 px-3 px-md-4">
          <div className="container-fluid">
            <div className="row g-2 align-items-end">
              <div className="col-6 col-md-2">
                <label className="form-label small fw-bold text-uppercase">Location</label>
                <input type="text" className="form-control form-control-sm" placeholder="Where?" />
              </div>
              <div className="col-6 col-md-2">
                <label className="form-label small fw-bold text-uppercase">Check in</label>
                <input type="date" className="form-control form-control-sm" />
              </div>
              <div className="col-6 col-md-2">
                <label className="form-label small fw-bold text-uppercase">Check out</label>
                <input type="date" className="form-control form-control-sm" />
              </div>
              <div className="col-6 col-md-2">
                <label className="form-label small fw-bold text-uppercase">Guests</label>
                <input type="number" className="form-control form-control-sm" placeholder="1" defaultValue="1" />
              </div>
              <div className="col-12 col-md-2">
                <button className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2">
                  <IoSearch size={16} /> Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <HeaderAccount />
    </header>
  );
}

// Account button with popup menu
function HeaderAccountButton() {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const raw = localStorage.getItem('travelmate_user');
    const logged = localStorage.getItem('travelmate_logged_in') === 'true';
    setUser(logged && raw ? JSON.parse(raw) : null);

    const onAuthChanged = () => {
      const r = localStorage.getItem('travelmate_user');
      const l = localStorage.getItem('travelmate_logged_in') === 'true';
      setUser(l && r ? JSON.parse(r) : null);
    };

    const onOpenAuth = () => setShowAuth(true);
    const onToggleMenu = () => setShowMenu((s) => !s);

    window.addEventListener('travelmate:auth-changed', onAuthChanged);
    window.addEventListener('travelmate:open-auth', onOpenAuth);
    window.addEventListener('travelmate:toggle-account-menu', onToggleMenu);

    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShowMenu(false);
    };
    document.addEventListener('click', onDocClick);

    return () => {
      window.removeEventListener('travelmate:auth-changed', onAuthChanged);
      window.removeEventListener('travelmate:open-auth', onOpenAuth);
      window.removeEventListener('travelmate:toggle-account-menu', onToggleMenu);
      document.removeEventListener('click', onDocClick);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('travelmate_logged_in');
    // Keep travelmate_user so they can login again later
    // localStorage.removeItem('travelmate_user');
    setUser(null);
    setShowMenu(false);
    navigate('/');
    window.dispatchEvent(new CustomEvent('travelmate:auth-changed', { detail: { user: null, action: 'logout' } }));
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div
        className="d-flex align-items-center gap-2 border border-1 rounded-pill px-2 py-1"
        role="button"
        tabIndex={0}
        onClick={() => {
          if (user) {
            setShowMenu(!showMenu);
          } else {
            setShowAuth(true);
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        <GiHamburgerMenu size={16} className="text-dark" />
        {user ? (
          <>
            <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white" style={{ width: '28px', height: '28px', fontSize: '14px' }}>
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="d-none d-md-inline ms-2" style={{ fontWeight: 600 }}>{user.name.split(' ')[0]}</span>
          </>
        ) : (
          <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white" style={{ width: '28px', height: '28px', fontSize: '14px' }}>
            👤
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal 
        show={showAuth} 
        onClose={() => setShowAuth(false)} 
        onLogin={(u) => { 
          setUser(u); 
          setShowAuth(false); 
          window.dispatchEvent(new CustomEvent('travelmate:auth-changed', { detail: { user: u, action: 'login' } })); 
        }} 
        onRegister={(u) => { 
          setUser(u); 
          setShowAuth(false); 
          window.dispatchEvent(new CustomEvent('travelmate:auth-changed', { detail: { user: u, action: 'register' } })); 
        }} 
        onSkip={() => setShowAuth(false)} 
      />

      {/* Account Menu Dropdown */}
      {user && showMenu && (
        <div className="card shadow-sm" style={{ 
          position: 'absolute', 
          right: 0, 
          top: '48px', 
          zIndex: 1040,
          minWidth: '220px'
        }}>
          <div className="card-body p-3">
            <div className="mb-3">
              <strong style={{ fontSize: '0.95rem' }}>{user.name}</strong>
              <div className="text-muted small">{user.email}</div>
            </div>
            <a href="/profile" className="btn btn-sm btn-outline-primary w-100 mb-2">Profile</a>
            <button className="btn btn-sm btn-outline-danger w-100" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Small wrapper to manage account menu and auth modal so Header markup stays tidy
function HeaderAccount() {
  return null;
}

export default Header;
