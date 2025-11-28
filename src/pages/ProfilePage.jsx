import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    preferences: { beach: false, mountain: false, city: false, nature: false },
    budget: 3000,
    duration: 3,
  });

  const [itineraries, setItineraries] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const raw = localStorage.getItem('travelmate_user');
    if (raw) {
      const u = JSON.parse(raw);
      setUser(u);
      setFormData({
        name: u.name,
        email: u.email,
        preferences: u.preferences ? Object.fromEntries(
          ['beach', 'mountain', 'city', 'nature'].map(p => [p, u.preferences.includes(p)])
        ) : { beach: false, mountain: false, city: false, nature: false },
        budget: u.budget || 3000,
        duration: u.duration || 3,
      });
    }

    // Load itineraries and recommendations from localStorage
    const saved = localStorage.getItem('travelmate_itineraries');
    if (saved) setItineraries(JSON.parse(saved));

    const recs = localStorage.getItem('travelmate_recommendations');
    if (recs) setRecommendations(JSON.parse(recs));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePrefChange = (key) => {
    setFormData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: !prev.preferences[key] }
    }));
  };

  const handleSaveProfile = () => {
    const updated = {
      ...user,
      ...formData,
      preferences: Object.keys(formData.preferences).filter(k => formData.preferences[k]),
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem('travelmate_user', JSON.stringify(updated));
    setUser(updated);
    setIsEditing(false);
    window.dispatchEvent(new CustomEvent('travelmate:auth-changed', { detail: { user: updated, action: 'profile-update' } }));
    alert('Profile updated successfully!');
  };

  const handleAddItinerary = () => {
    const name = prompt('Itinerary name:');
    if (!name) return;
    const newItin = {
      id: Date.now(),
      name,
      destination: prompt('Destination:') || 'TBD',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      places: [],
      createdAt: new Date().toISOString(),
    };
    const updated = [...itineraries, newItin];
    setItineraries(updated);
    localStorage.setItem('travelmate_itineraries', JSON.stringify(updated));
  };

  const handleDeleteItinerary = (id) => {
    const updated = itineraries.filter(i => i.id !== id);
    setItineraries(updated);
    localStorage.setItem('travelmate_itineraries', JSON.stringify(updated));
  };

  const handleAddRecommendation = () => {
    const name = prompt('Place name:');
    if (!name) return;
    const rating = parseInt(prompt('Rating (1-5):')) || 5;
    const newRec = {
      id: Date.now(),
      name,
      rating: Math.min(Math.max(rating, 1), 5),
      comment: prompt('Comment (optional):') || '',
      savedAt: new Date().toISOString(),
    };
    const updated = [...recommendations, newRec];
    setRecommendations(updated);
    localStorage.setItem('travelmate_recommendations', JSON.stringify(updated));
  };

  const handleDeleteRecommendation = (id) => {
    const updated = recommendations.filter(r => r.id !== id);
    setRecommendations(updated);
    localStorage.setItem('travelmate_recommendations', JSON.stringify(updated));
  };

  if (!user) {
    return (
      <>
        <Header />
        <div className="container py-5 text-center">
          <h2>Not logged in</h2>
          <p className="text-muted">Please log in to view your profile.</p>
          <a href="/" className="btn btn-primary">Go Home</a>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3">
            {/* Profile Card Sidebar */}
            <div className="card mb-4">
              <div className="card-body text-center">
                <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white mx-auto mb-3" style={{ width: 80, height: 80, fontSize: 32 }}>
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <h5 className="card-title">{user.name}</h5>
                <p className="text-muted small">{user.email}</p>
                <small className="text-secondary">Member since {new Date(user.createdAt).toLocaleDateString()}</small>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="list-group mb-4">
              <button
                className={`list-group-item list-group-item-action ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile Settings
              </button>
              <button
                className={`list-group-item list-group-item-action ${activeTab === 'itineraries' ? 'active' : ''}`}
                onClick={() => setActiveTab('itineraries')}
              >
                My Itineraries
              </button>
              <button
                className={`list-group-item list-group-item-action ${activeTab === 'recommendations' ? 'active' : ''}`}
                onClick={() => setActiveTab('recommendations')}
              >
                Saved & Rated
              </button>
            </div>
          </div>

          <div className="col-lg-9">
            {/* Profile Settings Tab */}
            {activeTab === 'profile' && (
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Profile Settings</h5>
                  {!isEditing && (
                    <button className="btn btn-sm btn-primary" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </button>
                  )}
                </div>
                <div className="card-body">
                  {!isEditing ? (
                    <div>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Name</label>
                        <p className="form-control-plaintext">{formData.name}</p>
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Email</label>
                        <p className="form-control-plaintext">{formData.email}</p>
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Travel Preferences</label>
                        <div>
                          {Object.keys(formData.preferences).map(key => (
                            <span key={key} className="badge bg-secondary me-2">
                              {formData.preferences[key] ? '✓ ' : ''}{key.charAt(0).toUpperCase() + key.slice(1)}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Budget Range</label>
                        <p className="form-control-plaintext">₱{formData.budget}</p>
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Preferred Trip Duration</label>
                        <p className="form-control-plaintext">{formData.duration} day{formData.duration > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  ) : (
                    <form>
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label d-block">Travel Preferences</label>
                        {Object.keys(formData.preferences).map(key => (
                          <div key={key} className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`pref-${key}`}
                              checked={formData.preferences[key]}
                              onChange={() => handlePrefChange(key)}
                            />
                            <label className="form-check-label" htmlFor={`pref-${key}`}>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                          </div>
                        ))}
                      </div>
                      <div className="mb-3">
                        <label className="form-label d-block">Budget: ₱{formData.budget}</label>
                        <input
                          type="range"
                          className="form-range"
                          name="budget"
                          min="500"
                          max="10000"
                          step="100"
                          value={formData.budget}
                          onChange={(e) => setFormData(prev => ({ ...prev, budget: Number(e.target.value) }))}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Trip Duration (days)</label>
                        <select
                          className="form-select"
                          name="duration"
                          value={formData.duration}
                          onChange={(e) => setFormData(prev => ({ ...prev, duration: Number(e.target.value) }))}
                        >
                          {[1, 2, 3, 4, 5, 7, 10, 14].map(d => (
                            <option key={d} value={d}>{d} day{d > 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                      <div className="d-flex gap-2">
                        <button type="button" className="btn btn-primary" onClick={handleSaveProfile}>
                          Save Changes
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* Itineraries Tab */}
            {activeTab === 'itineraries' && (
              <div>
                <div className="card mb-3">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">My Itineraries</h5>
                    <button className="btn btn-sm btn-success" onClick={handleAddItinerary}>
                      + New Itinerary
                    </button>
                  </div>
                </div>
                {itineraries.length === 0 ? (
                  <div className="alert alert-info">No itineraries yet. Create one to get started!</div>
                ) : (
                  <div className="row g-3">
                    {itineraries.map(itin => (
                      <div key={itin.id} className="col-md-6">
                        <div className="card">
                          <div className="card-body">
                            <h6 className="card-title">{itin.name}</h6>
                            <p className="card-text text-muted small">
                              <strong>Destination:</strong> {itin.destination}
                            </p>
                            <p className="card-text text-muted small">
                              <strong>Start:</strong> {itin.startDate}
                            </p>
                            <div className="d-flex gap-2">
                              <button className="btn btn-sm btn-outline-primary">View</button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteItinerary(itin.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Recommendations Tab */}
            {activeTab === 'recommendations' && (
              <div>
                <div className="card mb-3">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Saved Places & Ratings</h5>
                    <button className="btn btn-sm btn-success" onClick={handleAddRecommendation}>
                      + Add Rating
                    </button>
                  </div>
                </div>
                {recommendations.length === 0 ? (
                  <div className="alert alert-info">No saved recommendations yet. Start rating places!</div>
                ) : (
                  <div className="row g-3">
                    {recommendations.map(rec => (
                      <div key={rec.id} className="col-md-6">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h6 className="card-title mb-0">{rec.name}</h6>
                              <div className="badge bg-warning text-dark">
                                {'⭐'.repeat(rec.rating)}
                              </div>
                            </div>
                            {rec.comment && (
                              <p className="card-text small text-muted">"{rec.comment}"</p>
                            )}
                            <p className="card-text text-muted" style={{ fontSize: '0.75rem' }}>
                              Saved {new Date(rec.savedAt).toLocaleDateString()}
                            </p>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteRecommendation(rec.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
