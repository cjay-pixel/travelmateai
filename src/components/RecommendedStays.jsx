import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';

function RecommendedStays() {
  const [currentPage, setCurrentPage] = useState(0);

  const stays = [
    {
      id: 1,
      name: 'Luxury Beachfront Resort',
      location: 'Boracay, Aklan',
      price: '₱4,500',
      rating: 4.9,
      reviews: 2156,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=400&fit=crop',
      type: 'Resort'
    },
    {
      id: 2,
      name: 'Island Paradise Villa',
      location: 'Palawan, El Nido',
      price: '₱5,200',
      rating: 4.8,
      reviews: 1890,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop',
      type: 'Villa'
    },
    {
      id: 3,
      name: 'Boutique Hotel Downtown',
      location: 'Cebu City',
      price: '₱2,800',
      rating: 4.7,
      reviews: 1567,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=400&fit=crop',
      type: 'Hotel'
    },
    {
      id: 4,
      name: 'Tropical Garden Bungalows',
      location: 'Davao, Samal',
      price: '₱3,200',
      rating: 4.6,
      reviews: 1234,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&h=400&fit=crop',
      type: 'Bungalow'
    },
    {
      id: 5,
      name: 'Cozy Mountain Retreat',
      location: 'Ifugao, Banaue',
      price: '₱2,200',
      rating: 4.8,
      reviews: 945,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop',
      type: 'Cottage'
    },
    {
      id: 6,
      name: 'Five-Star Oceanfront',
      location: 'Batanes, Basco',
      price: '₱6,500',
      rating: 4.9,
      reviews: 876,
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=400&fit=crop',
      type: 'Resort'
    },
    {
      id: 7,
      name: 'Surfer\'s Paradise Hotel',
      location: 'Siargao, Surigao',
      price: '₱3,800',
      rating: 4.7,
      reviews: 1123,
      image: 'https://images.unsplash.com/photo-1551524164-0b41c4874456?w=500&h=400&fit=crop',
      type: 'Hotel'
    },
    {
      id: 8,
      name: 'Enchanted Island Resort',
      location: 'Siquijor',
      price: '₱3,500',
      rating: 4.6,
      reviews: 1045,
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500&h=400&fit=crop',
      type: 'Resort'
    },
    {
      id: 9,
      name: 'Modern City Apartment',
      location: 'Manila, Makati',
      price: '₱2,500',
      rating: 4.5,
      reviews: 2034,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop',
      type: 'Apartment'
    },
    {
      id: 10,
      name: 'Coral Garden Diving Lodge',
      location: 'Coron, Palawan',
      price: '₱4,200',
      rating: 4.8,
      reviews: 1456,
      image: 'https://images.unsplash.com/photo-1542314503-37143adecb26?w=500&h=400&fit=crop',
      type: 'Lodge'
    },
    {
      id: 11,
      name: 'Chocolate Hills View Hotel',
      location: 'Bohol, Panglao',
      price: '₱3,100',
      rating: 4.7,
      reviews: 1289,
      image: 'https://images.unsplash.com/photo-1571896349842-fb88d92ff25e?w=500&h=400&fit=crop',
      type: 'Hotel'
    },
    {
      id: 12,
      name: 'Volcanic Hot Spring Resort',
      location: 'Camiguin',
      price: '₱3,600',
      rating: 4.8,
      reviews: 987,
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&h=400&fit=crop',
      type: 'Resort'
    },
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(stays.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentStays = stays.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold" style={{ color: '#222' }}>Recommended to Stay in Philippines</h2>
          <p className="lead" style={{ color: '#717171' }}>Explore the finest accommodations and lodging experiences</p>
        </div>

        {/* Stays Grid */}
        <div className="row g-4 mb-5">
          {currentStays.map((stay) => (
            <div key={stay.id} className="col-lg-2 col-md-4 col-sm-6">
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
                    src={stay.image} 
                    alt={stay.name} 
                    className="card-img-top" 
                    style={{ 
                      objectFit: 'cover', 
                      height: '100%',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  
                  {/* Type Badge */}
                  <span 
                    className="badge position-absolute top-0 start-0 m-2" 
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', fontSize: '0.7rem', textTransform: 'uppercase' }}
                  >
                    {stay.type}
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
                      {stay.name}
                    </h5>
                    <div className="d-flex align-items-center gap-1" style={{ whiteSpace: 'nowrap' }}>
                      <AiFillStar style={{ color: '#222', fontSize: '0.875rem' }} />
                      <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#222' }}>
                        {stay.rating}
                      </span>
                    </div>
                  </div>

                  <p className="card-text" style={{ fontSize: '0.875rem', color: '#717171', margin: '4px 0' }}>
                    {stay.location}
                  </p>

                  <p className="card-text" style={{ fontSize: '0.75rem', color: '#999', margin: '4px 0' }}>
                    {stay.reviews} reviews
                  </p>

                  <p className="card-text mt-2 mb-0" style={{ fontSize: '0.95rem', color: '#222', fontWeight: '600' }}>
                    <span style={{ fontWeight: '700' }}>{stay.price}</span>
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

export default RecommendedStays;
