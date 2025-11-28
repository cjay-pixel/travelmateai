import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { IoMapOutline } from 'react-icons/io5';

function RecommendationsPage() {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [budget, setBudget] = useState(5000);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [groupSize, setGroupSize] = useState(1);
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(true);
  const [expandedAccommodations, setExpandedAccommodations] = useState({});
  const [savedRecommendations, setSavedRecommendations] = useState([]);

  const allDestinations = [
    {
      id: 1,
      name: 'Boracay Island',
      description: 'White sand beaches, vibrant nightlife, water sports',
      photo: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop',
      estimatedCost: { min: 800, max: 2500 },
      rating: 4.8,
      reviews: 320,
      region: 'Western Visayas',
      mapLink: 'https://maps.google.com/?q=Boracay+Island',
      accommodations: [
        { name: 'Boracay Beach Resort', price: 2000, stars: 4.5 },
        { name: 'Luxury Beachfront Hotel', price: 3500, stars: 4.9 },
      ],
      interests: ['beach', 'nightlife', 'adventure'],
      bestTime: 'November to April (Dry Season)',
    },
    {
      id: 2,
      name: 'Palawan',
      description: 'El Nido limestone cliffs, island hopping, underground river',
      photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
      estimatedCost: { min: 1200, max: 3000 },
      rating: 4.9,
      reviews: 450,
      region: 'MIMAROPA',
      mapLink: 'https://maps.google.com/?q=Palawan+Philippines',
      accommodations: [
        { name: 'El Nido Eco-Lodge', price: 1800, stars: 4.7 },
        { name: 'Puerto Princesa Dive Resort', price: 2500, stars: 4.6 },
      ],
      interests: ['nature', 'adventure', 'beach'],
      bestTime: 'November to May (Dry Season)',
    },
    {
      id: 3,
      name: 'Sagano Bamboo Grove',
      description: 'Serene bamboo forest, cultural experience, temples',
      photo: 'https://images.unsplash.com/photo-1522383881298-6f1b3d7a2d8e?w=500&h=300&fit=crop',
      estimatedCost: { min: 600, max: 1500 },
      rating: 4.6,
      reviews: 280,
      region: 'Cordillera',
      mapLink: 'https://maps.google.com/?q=Banaue+Rice+Terraces',
      accommodations: [
        { name: 'Mountain Resort Cottage', price: 1200, stars: 4.4 },
        { name: 'Heritage Lodge', price: 1600, stars: 4.5 },
      ],
      interests: ['nature', 'culture'],
      bestTime: 'October to May',
    },
    {
      id: 4,
      name: 'Cebu City',
      description: 'Historical sites, Oslob whale sharks, diving spots',
      photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop',
      estimatedCost: { min: 700, max: 2000 },
      rating: 4.5,
      reviews: 350,
      region: 'Central Visayas',
      mapLink: 'https://maps.google.com/?q=Cebu+Philippines',
      accommodations: [
        { name: 'Waterfront Hotel Cebu', price: 1500, stars: 4.4 },
        { name: 'Seaside Resort', price: 2200, stars: 4.6 },
      ],
      interests: ['beach', 'adventure', 'history'],
      bestTime: 'November to April',
    },
    {
      id: 5,
      name: 'Chocolate Hills',
      description: 'Unique geological formation, panoramic views, adventure',
      photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
      estimatedCost: { min: 500, max: 1500 },
      rating: 4.7,
      reviews: 290,
      region: 'Central Visayas',
      mapLink: 'https://maps.google.com/?q=Chocolate+Hills+Bohol',
      accommodations: [
        { name: 'Bohol Nature Resort', price: 1100, stars: 4.3 },
        { name: 'Premium Hilltop Hotel', price: 1800, stars: 4.7 },
      ],
      interests: ['nature', 'adventure'],
      bestTime: 'December to May',
    },
    {
      id: 6,
      name: 'Machu Picchu',
      description: 'Ancient ruins, mountain views, historical experience',
      photo: 'https://images.unsplash.com/photo-1587595431973-160b0d94add1?w=500&h=300&fit=crop',
      estimatedCost: { min: 1500, max: 3500 },
      rating: 4.9,
      reviews: 500,
      region: 'Cusco Region',
      mapLink: 'https://maps.google.com/?q=Machu+Picchu+Peru',
      accommodations: [
        { name: 'Mountain Lodge Peru', price: 2000, stars: 4.8 },
        { name: 'Historic Inn', price: 2800, stars: 4.9 },
      ],
      interests: ['history', 'nature', 'culture'],
      bestTime: 'April to October',
    },
    {
      id: 7,
      name: 'Ilocos Region',
      description: 'Heritage towns, salt farms, historical churches',
      photo: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&h=300&fit=crop',
      estimatedCost: { min: 400, max: 1200 },
      rating: 4.4,
      reviews: 200,
      region: 'Ilocos',
      mapLink: 'https://maps.google.com/?q=Vigan+Ilocos+Philippines',
      accommodations: [
        { name: 'Heritage Hotel Vigan', price: 900, stars: 4.3 },
        { name: 'Boutique Inn', price: 1400, stars: 4.5 },
      ],
      interests: ['history', 'culture'],
      bestTime: 'November to February',
    },
    {
      id: 8,
      name: 'Camiguin Island',
      description: 'Waterfalls, hot springs, volcano, white island',
      photo: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop',
      estimatedCost: { min: 700, max: 1800 },
      rating: 4.6,
      reviews: 240,
      region: 'Northern Mindanao',
      mapLink: 'https://maps.google.com/?q=Camiguin+Philippines',
      accommodations: [
        { name: 'Camiguin Island Resort', price: 1300, stars: 4.4 },
        { name: 'Coastal Retreat', price: 1700, stars: 4.6 },
      ],
      interests: ['nature', 'adventure', 'beach'],
      bestTime: 'November to May',
    },
  ];

  const interestOptions = ['beach', 'adventure', 'nature', 'history', 'culture', 'nightlife'];

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const toggleSavedRecommendation = (id) => {
    setSavedRecommendations((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]
    );
  };

  const toggleAccommodation = (destId) => {
    setExpandedAccommodations((prev) => ({
      ...prev,
      [destId]: !prev[destId],
    }));
  };

  const filteredDestinations = allDestinations.filter((dest) => {
    const withinBudget = dest.estimatedCost.min <= budget;
    const hasInterest =
      selectedInterests.length === 0 ||
      selectedInterests.some((interest) => dest.interests.includes(interest));
    const regionMatch = filterBy === 'all' || dest.region === filterBy;
    return withinBudget && hasInterest && regionMatch;
  });

  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'cost-low') return a.estimatedCost.min - b.estimatedCost.min;
    if (sortBy === 'cost-high') return b.estimatedCost.max - a.estimatedCost.max;
    return 0;
  });

  const regions = [...new Set(allDestinations.map((d) => d.region))];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main className="flex-grow-1 py-5" style={{ backgroundColor: '#f9f9f9' }}>
        <div className="container">
          <h1 className="mb-4">Find Your Perfect Destination</h1>

          {/* Filter Card */}
          <div className="card mb-4 shadow-sm">
            <div
              className="card-header bg-primary text-white d-flex justify-content-between align-items-center"
              role="button"
              onClick={() => setShowFilters(!showFilters)}
              style={{ cursor: 'pointer' }}
            >
              <h5 className="mb-0">Filters & Preferences</h5>
              <span>{showFilters ? '▼' : '▶'}</span>
            </div>

            {showFilters && (
              <div className="card-body">
                <div className="row g-4">
                  {/* Interests */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Travel Interests</label>
                    <div className="d-flex flex-wrap gap-2">
                      {interestOptions.map((interest) => (
                        <button
                          key={interest}
                          className={`btn btn-sm ${
                            selectedInterests.includes(interest)
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => toggleInterest(interest)}
                        >
                          {interest.charAt(0).toUpperCase() + interest.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Budget per Person: ₱{budget}</label>
                    <input
                      type="range"
                      className="form-range"
                      min="500"
                      max="5000"
                      step="100"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                    />
                  </div>

                  {/* Dates */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Start Date</label>
                    <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">End Date</label>
                    <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                  </div>

                  {/* Group Size */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Group Size</label>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      value={groupSize}
                      onChange={(e) => setGroupSize(Number(e.target.value))}
                    />
                  </div>

                  {/* Region Filter */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Region</label>
                    <select className="form-select" value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                      <option value="all">All Regions</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort By */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Sort By</label>
                    <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                      <option value="rating">Highest Rating</option>
                      <option value="cost-low">Lowest Cost</option>
                      <option value="cost-high">Highest Cost</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          <h4 className="mb-3">
            {sortedDestinations.length} Destination{sortedDestinations.length !== 1 ? 's' : ''} Found
          </h4>

          <div className="row g-4">
            {sortedDestinations.map((dest) => (
              <div key={dest.id} className="col-lg-6 col-xl-4">
                <div className="card h-100 shadow-sm hover-shadow" style={{ transition: 'box-shadow 0.3s' }}>
                  {/* Image */}
                  <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                    <img
                      src={dest.photo}
                      alt={dest.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <button
                      className="btn btn-light rounded-circle"
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        padding: '8px',
                      }}
                      onClick={() => toggleSavedRecommendation(dest.id)}
                    >
                      {savedRecommendations.includes(dest.id) ? (
                        <MdFavorite size={20} className="text-danger" />
                      ) : (
                        <MdFavoriteBorder size={20} className="text-dark" />
                      )}
                    </button>
                  </div>

                  <div className="card-body">
                    {/* Name & Region */}
                    <h5 className="card-title">{dest.name}</h5>
                    <p className="small text-muted mb-2">{dest.region}</p>

                    {/* Description */}
                    <p className="card-text small mb-3">{dest.description}</p>

                    {/* Rating */}
                    <div className="mb-2 d-flex align-items-center gap-2">
                      <div className="d-flex">
                        {[...Array(5)].map((_, i) => (
                          <AiFillStar
                            key={i}
                            size={14}
                            className={i < Math.floor(dest.rating) ? 'text-warning' : 'text-light'}
                          />
                        ))}
                      </div>
                      <span className="fw-bold">{dest.rating}</span>
                      <span className="text-muted small">({dest.reviews} reviews)</span>
                    </div>

                    {/* Cost */}
                    <p className="mb-2">
                      <strong>₱{dest.estimatedCost.min.toLocaleString()} - ₱{dest.estimatedCost.max.toLocaleString()}</strong>
                      <small className="text-muted d-block">per person per day</small>
                    </p>

                    {/* Best Time to Visit */}
                    <p className="small mb-3">
                      <strong>Best Time:</strong> {dest.bestTime}
                    </p>

                    {/* Accommodations */}
                    <div className="mb-3">
                      <button
                        className="btn btn-sm btn-outline-primary w-100 mb-2"
                        onClick={() => toggleAccommodation(dest.id)}
                      >
                        {expandedAccommodations[dest.id] ? '▼' : '▶'} Accommodations
                      </button>
                      {expandedAccommodations[dest.id] && (
                        <div className="ps-2 border-start">
                          {dest.accommodations.map((acc, idx) => (
                            <div key={idx} className="mb-2 small">
                              <div className="fw-bold">{acc.name}</div>
                              <div className="text-muted">₱{acc.price.toLocaleString()}/night</div>
                              <div className="d-flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <AiFillStar
                                    key={i}
                                    size={12}
                                    className={i < Math.floor(acc.stars) ? 'text-warning' : 'text-light'}
                                  />
                                ))}
                                <span className="text-muted">{acc.stars}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex gap-2">
                      <a
                        href={dest.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-secondary flex-grow-1"
                      >
                        <IoMapOutline size={16} /> Map
                      </a>
                      <button 
                        onClick={() => navigate(`/destination/${dest.id}`)} 
                        className="btn btn-sm btn-primary flex-grow-1"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedDestinations.length === 0 && (
            <div className="alert alert-info text-center">
              No destinations match your criteria. Try adjusting filters.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default RecommendationsPage;
