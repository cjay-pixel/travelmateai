function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-top" style={{ backgroundColor: '#f7f7f7', marginTop: '80px' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              {/* Website Name */}
              <h5 className="mb-4" style={{ color: '#222', fontWeight: '700', fontSize: '1.25rem', letterSpacing: '-0.5px' }}>
                TravelMate AI
              </h5>

              {/* Links */}
              <div className="d-flex justify-content-center gap-4 mb-4 flex-wrap">
                <a 
                  href="#terms" 
                  style={{ 
                    color: '#717171', 
                    textDecoration: 'none', 
                    fontSize: '0.95rem',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#222'}
                  onMouseLeave={(e) => e.target.style.color = '#717171'}
                >
                  Terms & Conditions
                </a>
                <span style={{ color: '#dddddd' }}>•</span>
                <a 
                  href="#privacy" 
                  style={{ 
                    color: '#717171', 
                    textDecoration: 'none', 
                    fontSize: '0.95rem',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#222'}
                  onMouseLeave={(e) => e.target.style.color = '#717171'}
                >
                  Privacy Policy
                </a>
              </div>

              {/* Copyright */}
              <p style={{ color: '#999', fontSize: '0.875rem', margin: '0' }}>
                © {currentYear} TravelMate AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
