import { useState, useEffect } from 'react';
import { IoSearch } from 'react-icons/io5';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdFavoriteBorder } from 'react-icons/md';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
          <div
            className="d-none d-md-flex justify-content-center mx-3"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1030,
            }}
          >
            <div className={`input-group rounded-pill bg-light border border-1 px-3 py-2 ${searchOpen ? 'border-secondary' : 'border-secondary'}`} style={{ maxWidth: '480px', width: '100%' }}>
              <input
                type="text"
                className="form-control border-0 bg-light"
                placeholder="Where are you going?"
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setSearchOpen(false)}
                style={{outline: 'none'}}
              />
              <button className="btn btn-link text-secondary p-0" type="button">
                <IoSearch size={18} />
              </button>
            </div>
          </div>

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
            <div className="ms-auto d-flex align-items-center gap-3">
              <button className="btn btn-link text-dark text-decoration-none">
                Become a Host
              </button>
              <div className="d-flex align-items-center gap-2 border border-1 rounded-pill px-2 py-1">
                <GiHamburgerMenu size={16} className="text-dark" />
                <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white" style={{width: '28px', height: '28px', fontSize: '14px'}}>
                  👤
                </div>
              </div>
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
    </header>
  );
}

export default Header;
