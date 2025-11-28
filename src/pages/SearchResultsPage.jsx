import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { IoMapOutline } from 'react-icons/io5';

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filteredResults, setFilteredResults] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [savedResults, setSavedResults] = useState([]);

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
      keywords: ['beach', 'island', 'water sports', 'nightlife', 'philippines'],
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
      keywords: ['island', 'nature', 'diving', 'beach', 'adventure', 'philippines'],
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
      keywords: ['nature', 'culture', 'forest', 'temples', 'photography', 'philippines'],
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
      keywords: ['island', 'diving', 'history', 'whale sharks', 'philippines'],
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
      keywords: ['nature', 'geological', 'adventure', 'views', 'philippines'],
    },
    {
      id: 6,
      name: 'Ilocos Region',
      description: 'Heritage towns, salt farms, historical churches',
      photo: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&h=300&fit=crop',
      estimatedCost: { min: 400, max: 1200 },
      rating: 4.4,
      reviews: 200,
      region: 'Ilocos',
      mapLink: 'https://maps.google.com/?q=Vigan+Ilocos+Philippines',
      keywords: ['history', 'culture', 'heritage', 'spain', 'philippines'],
    },
    {
      id: 7,
      name: 'Camiguin Island',
      description: 'Waterfalls, hot springs, volcano, white island',
      photo: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop',
      estimatedCost: { min: 700, max: 1800 },
      rating: 4.6,
      reviews: 240,
      region: 'Northern Mindanao',
      mapLink: 'https://maps.google.com/?q=Camiguin+Philippines',
      keywords: ['island', 'nature', 'volcano', 'waterfalls', 'philippines'],
    },
    {
      id: 8,
      name: 'Manila',
      description: 'Capital city, museums, historical landmarks, vibrant culture',
      photo: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&h=300&fit=crop',
      estimatedCost: { min: 500, max: 1500 },
      rating: 4.3,
      reviews: 400,
      region: 'NCR',
      mapLink: 'https://maps.google.com/?q=Manila+Philippines',
      keywords: ['city', 'culture', 'museums', 'history', 'philippines'],
    },
  ];

  useEffect(() => {
    const searchQuery = query.toLowerCase();
    let results = allDestinations.filter((dest) => {
      const nameMatch = dest.name.toLowerCase().includes(searchQuery);
      const descMatch = dest.description.toLowerCase().includes(searchQuery);
      const regionMatch = dest.region.toLowerCase().includes(searchQuery);
      const keywordMatch = dest.keywords.some((kw) => kw.includes(searchQuery));
      return nameMatch || descMatch || regionMatch || keywordMatch;
    });

    // Sort results
    if (sortBy === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'cost-low') {
      results.sort((a, b) => a.estimatedCost.min - b.estimatedCost.min);
    } else if (sortBy === 'cost-high') {
      results.sort((a, b) => b.estimatedCost.max - a.estimatedCost.max);
    } else if (sortBy === 'recent') {
      results.reverse();
    }

    setFilteredResults(results);
  }, [query, sortBy]);

  const toggleSavedResult = (id) => {
    setSavedResults((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main className="flex-grow-1 py-5" style={{ backgroundColor: '#f9f9f9' }}>
        <div className="container">
          {/* Search Header */}
          <div className="mb-4">
            <h1>Search Results</h1>
            <p className="text-muted">
              {query && (
                <>
                  Showing results for: <strong>"{query}"</strong>
                </>
              )}
            </p>
          </div>

          {/* Controls */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="row g-3 align-items-end">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Sort By</label>
                  <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="relevance">Most Relevant</option>
                    <option value="rating">Highest Rating</option>
                    <option value="cost-low">Lowest Cost</option>
                    <option value="cost-high">Highest Cost</option>
                    <option value="recent">Most Recent</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">View</label>
                  <div className="btn-group w-100" role="group">
                    <input
                      type="radio"
                      className="btn-check"
                      name="view"
                      id="viewGrid"
                      value="grid"
                      checked={viewMode === 'grid'}
                      onChange={(e) => setViewMode(e.target.value)}
                    />
                    <label className="btn btn-outline-primary" htmlFor="viewGrid">
                      Grid
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="view"
                      id="viewList"
                      value="list"
                      checked={viewMode === 'list'}
                      onChange={(e) => setViewMode(e.target.value)}
                    />
                    <label className="btn btn-outline-primary" htmlFor="viewList">
                      List
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="alert alert-info">
            Found <strong>{filteredResults.length}</strong> result
            {filteredResults.length !== 1 ? 's' : ''}
          </div>

          {/* Results */}
          {filteredResults.length === 0 ? (
            <div className="card">
              <div className="card-body text-center py-5">
                <h4>No Results Found</h4>
                <p className="text-muted mb-3">
                  We couldn't find any destinations matching "{query}"
                </p>
                <a href="/recommendations" className="btn btn-primary">
                  Browse All Destinations
                </a>
              </div>
            </div>
          ) : viewMode === 'grid' ? (
            // Grid View
            <div className="row g-4">
              {filteredResults.map((dest) => (
                <div key={dest.id} className="col-lg-6 col-xl-4">
                  <div className="card h-100 shadow-sm">
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
                        onClick={() => toggleSavedResult(dest.id)}
                      >
                        {savedResults.includes(dest.id) ? (
                          <MdFavorite size={20} className="text-danger" />
                        ) : (
                          <MdFavoriteBorder size={20} className="text-dark" />
                        )}
                      </button>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">{dest.name}</h5>
                      <p className="small text-muted mb-2">{dest.region}</p>
                      <p className="card-text small mb-3">{dest.description}</p>

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
                        <span className="text-muted small">({dest.reviews})</span>
                      </div>

                      <p className="mb-3">
                        <strong>₱{dest.estimatedCost.min.toLocaleString()} - ₱{dest.estimatedCost.max.toLocaleString()}</strong>
                        <small className="text-muted d-block">per person per day</small>
                      </p>

                      <div className="d-flex gap-2">
                        <a
                          href={dest.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-secondary flex-grow-1"
                        >
                          <IoMapOutline size={16} /> Map
                        </a>
                        <a href={`/destination/${dest.id}`} className="btn btn-sm btn-primary flex-grow-1">
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div>
              {filteredResults.map((dest) => (
                <div key={dest.id} className="card shadow-sm mb-3">
                  <div className="row g-0">
                    <div className="col-md-3">
                      <img
                        src={dest.photo}
                        alt={dest.name}
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h5 className="card-title">{dest.name}</h5>
                            <p className="text-muted mb-2">{dest.region}</p>
                            <p className="card-text mb-3">{dest.description}</p>

                            <div className="d-flex align-items-center gap-3">
                              <div className="d-flex align-items-center gap-2">
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

                              <div>
                                <strong>₱{dest.estimatedCost.min.toLocaleString()} - ₱{dest.estimatedCost.max.toLocaleString()}</strong>
                                <small className="text-muted d-block">per person per day</small>
                              </div>
                            </div>
                          </div>

                          <button
                            className="btn btn-outline-danger"
                            onClick={() => toggleSavedResult(dest.id)}
                          >
                            {savedResults.includes(dest.id) ? (
                              <MdFavorite size={20} className="text-danger" />
                            ) : (
                              <MdFavoriteBorder size={20} />
                            )}
                          </button>
                        </div>

                        <div className="d-flex gap-2 mt-3">
                          <a
                            href={dest.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-secondary"
                          >
                            <IoMapOutline size={16} /> Map
                          </a>
                          <a href={`/destination/${dest.id}`} className="btn btn-sm btn-primary">
                            View Details
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SearchResultsPage;
