import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';

function RecommendedPlaces() {
  const [currentPage, setCurrentPage] = useState(0);

  const places = [
    {
      id: 1,
      name: 'Boracay Island',
      location: 'Aklan',
      price: '₱2,500',
      rating: 4.8,
      reviews: 2340,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=400&fit=crop',
      category: 'Beach'
    },
    {
      id: 2,
      name: 'Palawan El Nido',
      location: 'Palawan',
      price: '₱3,200',
      rating: 4.9,
      reviews: 3120,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
      category: 'Island'
    },
    {
      id: 3,
      name: 'Cebu Mactan',
      location: 'Cebu',
      price: '₱1,800',
      rating: 4.6,
      reviews: 1890,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop',
      category: 'Resort'
    },
    {
      id: 4,
      name: 'Davao Samal Island',
      location: 'Davao',
      price: '₱2,100',
      rating: 4.7,
      reviews: 1520,
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=400&fit=crop',
      category: 'Beach'
    },
    {
      id: 5,
      name: 'Iloilo Guimaras',
      location: 'Iloilo',
      price: '₱1,900',
      rating: 4.5,
      reviews: 980,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
      category: 'Island'
    },
    {
      id: 6,
      name: 'Banaue Rice Terraces',
      location: 'Ifugao',
      price: '₱1,500',
      rating: 4.9,
      reviews: 2105,
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=400&fit=crop',
      category: 'Mountain'
    },
    {
      id: 7,
      name: 'Siargao Island',
      location: 'Surigao',
      price: '₱2,400',
      rating: 4.8,
      reviews: 2234,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=400&fit=crop',
      category: 'Beach'
    },
    {
      id: 8,
      name: 'Batanes Haveltian',
      location: 'Batanes',
      price: '₱3,500',
      rating: 4.9,
      reviews: 1870,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
      category: 'Island'
    },
    {
      id: 9,
      name: 'Siquijor Enchanted',
      location: 'Siquijor',
      price: '₱2,000',
      rating: 4.7,
      reviews: 1456,
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=400&fit=crop',
      category: 'Beach'
    },
    {
      id: 10,
      name: 'Coron Palawan',
      location: 'Palawan',
      price: '₱2,800',
      rating: 4.8,
      reviews: 2567,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop',
      category: 'Island'
    },
    {
      id: 11,
      name: 'Panglao Bohol',
      location: 'Bohol',
      price: '₱2,200',
      rating: 4.6,
      reviews: 1789,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
      category: 'Beach'
    },
    {
      id: 12,
      name: 'Camiguin Island',
      location: 'Camiguin',
      price: '₱2,100',
      rating: 4.7,
      reviews: 1234,
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=400&fit=crop',
      category: 'Island'
    },
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(places.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentPlaces = places.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-5" style={{ backgroundColor: '#f7f7f7' }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold" style={{ color: '#222' }}>Recommended Places in Philippines</h2>
          <p className="lead" style={{ color: '#717171' }}>Discover the most beautiful destinations and experiences</p>
        </div>

        {/* Places Grid */}
        <div className="row g-4 mb-5">
          {currentPlaces.map((place) => (
            <div key={place.id} className="col-lg-2 col-md-4 col-sm-6">
              <div className="card h-100 border-0 shadow-sm" style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Image Container */}
                <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                  <img 
                    src={place.image} 
                    alt={place.name} 
                    className="card-img-top" 
                    style={{ 
                      objectFit: 'cover', 
                      height: '100%',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  
                  {/* Category Badge */}
                  <span 
                    className="badge position-absolute top-0 start-0 m-2" 
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', fontSize: '0.7rem', textTransform: 'uppercase' }}
                  >
                    {place.category}
                  </span>

                  {/* Heart Button */}
                  <button 
                    className="btn btn-light rounded-circle position-absolute top-0 end-0 m-2"
                    style={{ width: '36px', height: '36px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ff385c';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#222';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                </div>

                {/* Card Body */}
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <h5 className="card-title mb-0" style={{ color: '#222', fontSize: '1rem' }}>
                      {place.name}
                    </h5>
                    <div className="d-flex align-items-center gap-1" style={{ whiteSpace: 'nowrap' }}>
                      <AiFillStar style={{ color: '#222', fontSize: '0.875rem' }} />
                      <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#222' }}>
                        {place.rating}
                      </span>
                    </div>
                  </div>

                  <p className="card-text" style={{ fontSize: '0.875rem', color: '#717171', margin: '4px 0' }}>
                    {place.location}
                  </p>

                  <p className="card-text" style={{ fontSize: '0.75rem', color: '#999', margin: '4px 0' }}>
                    {place.reviews} reviews
                  </p>

                  <p className="card-text mt-2 mb-0" style={{ fontSize: '0.95rem', color: '#222', fontWeight: '600' }}>
                    <span style={{ fontWeight: '700' }}>{place.price}</span>
                    <span style={{ fontWeight: '400', color: '#717171' }}> per night</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="d-flex justify-content-center align-items-center gap-4 mt-5">
          <button 
            onClick={handlePrevious}
            className="btn btn-outline-dark rounded-circle"
            style={{ width: '48px', height: '48px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }}
            aria-label="Previous page"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <FiChevronLeft size={24} />
          </button>

          <div className="d-flex gap-1" style={{ fontSize: '1rem', fontWeight: '600', color: '#222', minWidth: '60px', justifyContent: 'center' }}>
            <span style={{ fontWeight: '700' }}>{currentPage + 1}</span>
            <span style={{ color: '#ccc', margin: '0 4px' }}>/</span>
            <span style={{ color: '#717171', fontWeight: '400' }}>{totalPages}</span>
          </div>

          <button 
            onClick={handleNext}
            className="btn btn-outline-dark rounded-circle"
            style={{ width: '48px', height: '48px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }}
            aria-label="Next page"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default RecommendedPlaces;
