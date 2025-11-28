import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AiFillStar } from 'react-icons/ai';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { IoMapOutline } from 'react-icons/io5';

function DestinationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  // Convert id from string to number
  const destinationId = Number(id);

  const destinationData = {
    1: {
      name: 'Boracay Island',
      region: 'Western Visayas',
      rating: 4.8,
      reviews: 320,
      description: 'Boracay is a world-famous beach destination known for its pristine white sand beaches, crystal-clear waters, and vibrant nightlife. Perfect for water sports, relaxation, and social events.',
      fullDescription: `Boracay Island is one of the Philippines' most iconic destinations. With its 4km stretch of white sand beach, turquoise waters, and tropical climate, it's an ideal destination for both adventure seekers and beach lovers. The island offers water sports like parasailing and windsurfing, while the nearby town provides excellent restaurants and nightlife. The island has been developed with a wide range of accommodations from budget-friendly hostels to luxury resorts.

The island's pristine beaches are surrounded by lush tropical forests and stunning rock formations. Visitors can enjoy sunset cruises, island hopping tours, or simply relax on the beach. The island has excellent infrastructure with many shops, restaurants, and bars along the main beach area.`,
      photos: [
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      ],
      costBreakdown: [
        { item: 'Beach Entry', price: 'Free' },
        { item: 'Average Meal', price: '₱150-300' },
        { item: 'Water Sports (Parasailing)', price: '₱800-1200' },
        { item: 'Island Hopping Tour', price: '₱500-1000' },
        { item: 'Sunset Cruise', price: '₱600-1500' },
        { item: 'Accommodation (Budget)', price: '₱800-1200/night' },
        { item: 'Accommodation (Mid-range)', price: '₱2000-3500/night' },
      ],
      bestVisitTime: 'November to April (Dry Season)',
      weatherInfo: 'Sunny days, occasional rain in afternoon, water temperature 26-28°C',
      vibeAndAtmosphere: 'Lively, social, perfect for young travelers. Great nightlife and beach parties.',
      accommodations: [
        {
          name: 'Boracay Beach Resort',
          price: 2000,
          stars: 4.5,
          description: '3-star beachfront resort with pool and restaurant',
        },
        {
          name: 'Luxury Beachfront Hotel',
          price: 3500,
          stars: 4.9,
          description: '5-star resort with spa, multiple restaurants, water sports facilities',
        },
        {
          name: 'Budget Beach Hostel',
          price: 500,
          stars: 4.0,
          description: 'Affordable dorm beds, social atmosphere, near beach',
        },
      ],
      relatedDestinations: [
        { id: 4, name: 'Cebu City', match: '85% match' },
        { id: 2, name: 'Palawan', match: '80% match' },
        { id: 8, name: 'Camiguin Island', match: '75% match' },
      ],
      userReviews: [
        { author: 'John Doe', rating: 5, comment: 'Amazing beach! Worth every peso. Perfect for a holiday.' },
        { author: 'Maria Santos', rating: 4, comment: 'Beautiful but crowded. Still a must-visit destination.' },
        { author: 'Tourist Guide', rating: 4.5, comment: 'Great for water sports and relaxation.' },
      ],
    },
    2: {
      name: 'Palawan',
      region: 'MIMAROPA',
      rating: 4.9,
      reviews: 450,
      description: 'Palawan is a natural wonder featuring dramatic limestone cliffs, turquoise lagoons, and pristine beaches. Home to UNESCO sites and world-class diving.',
      fullDescription: `Palawan is consistently ranked as one of the best islands in the world. The region features stunning natural formations like the famous limestone cliffs of El Nido, the underground Puerto Princesa Subterranean River, and countless pristine beaches. The island offers world-class diving opportunities, island hopping adventures, and unparalleled natural beauty.

From the vibrant town of El Nido to the peaceful villages of Taytay and Coron, Palawan offers diverse experiences for different types of travelers. The island is known for its commitment to eco-tourism and environmental conservation.`,
      photos: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1445522051696-146b2e5d1cbb?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1502933691298-84fc14542831?w=600&h=400&fit=crop',
      ],
      costBreakdown: [
        { item: 'Puerto Princesa Subterranean River Tour', price: '₱600-800' },
        { item: 'Island Hopping El Nido', price: '₱800-1200' },
        { item: 'Diving (Per Dive)', price: '₱1000-1500' },
        { item: 'Average Meal', price: '₱200-400' },
        { item: 'Accommodation (Budget)', price: '₱1000-1500/night' },
        { item: 'Accommodation (Mid-range)', price: '₱2500-4000/night' },
      ],
      bestVisitTime: 'November to May (Dry Season)',
      weatherInfo: 'Mostly sunny, calm seas, water temperature 26-29°C',
      vibeAndAtmosphere: 'Nature-focused, eco-conscious, peaceful with adventure opportunities',
      accommodations: [
        {
          name: 'El Nido Eco-Lodge',
          price: 1800,
          stars: 4.7,
          description: 'Eco-friendly resort with stunning lagoon views',
        },
        {
          name: 'Puerto Princesa Dive Resort',
          price: 2500,
          stars: 4.6,
          description: 'Perfect for divers, with dive packages and training',
        },
      ],
      relatedDestinations: [
        { id: 1, name: 'Boracay Island', match: '80% match' },
        { id: 8, name: 'Camiguin Island', match: '85% match' },
        { id: 5, name: 'Chocolate Hills', match: '70% match' },
      ],
      userReviews: [
        { author: 'Adventure Seeker', rating: 5, comment: 'Breathtaking scenery. Must visit destination!' },
        { author: 'Diver Pro', rating: 5, comment: 'World-class diving spots. Incredible marine life.' },
      ],
    },
  };

  const destination = destinationData[destinationId] || destinationData[1];

  const handleToggleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleSubmitReview = () => {
    if (userRating === 0) {
      alert('Please select a rating');
      return;
    }

    const recommendation = {
      id: Date.now(),
      name: destination.name,
      rating: userRating,
      comment: userReview,
      savedAt: new Date().toISOString(),
    };

    const existingRecommendations = JSON.parse(
      localStorage.getItem('travelmate_recommendations') || '[]'
    );
    existingRecommendations.push(recommendation);
    localStorage.setItem('travelmate_recommendations', JSON.stringify(existingRecommendations));

    alert('Review saved to your profile!');
    setUserRating(0);
    setUserReview('');
    setShowReviewForm(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main className="flex-grow-1 py-5" style={{ backgroundColor: '#f9f9f9' }}>
        <div className="container">
          {/* Back Button */}
          <button className="btn btn-outline-primary mb-3" onClick={() => navigate(-1)}>
            ← Back
          </button>

          {/* Header Section */}
          <div className="row mb-5">
            <div className="col-lg-8">
              <div style={{ position: 'relative', marginBottom: '2rem' }}>
                <img
                  src={destination.photos[0]}
                  alt={destination.name}
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              </div>

              <h1 className="mb-2">{destination.name}</h1>
              <p className="text-muted mb-3">{destination.region}</p>

              {/* Rating & Actions */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="d-flex align-items-center gap-2">
                  <div className="d-flex">
                    {[...Array(5)].map((_, i) => (
                      <AiFillStar
                        key={i}
                        size={18}
                        className={i < Math.floor(destination.rating) ? 'text-warning' : 'text-light'}
                      />
                    ))}
                  </div>
                  <span className="fw-bold">{destination.rating}</span>
                  <span className="text-muted">({destination.reviews} reviews)</span>
                </div>

                <button
                  className={`btn ${isSaved ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={handleToggleSave}
                >
                  {isSaved ? <MdFavorite size={18} /> : <MdFavoriteBorder size={18} />}
                  {isSaved ? ' Saved' : ' Save'}
                </button>

                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-secondary"
                >
                  <IoMapOutline size={18} /> Map
                </a>
              </div>

              {/* Description */}
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">About This Destination</h5>
                </div>
                <div className="card-body">
                  <p>{destination.fullDescription}</p>
                </div>
              </div>

              {/* Gallery */}
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Photo Gallery</h5>
                </div>
                <div className="card-body">
                  <div className="row g-2">
                    {destination.photos.map((photo, idx) => (
                      <div key={idx} className="col-md-6">
                        <img
                          src={photo}
                          alt={`${destination.name} ${idx + 1}`}
                          style={{
                            width: '100%',
                            height: '250px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Cost Breakdown (Per Person)</h5>
                </div>
                <div className="card-body">
                  <table className="table table-hover mb-0">
                    <tbody>
                      {destination.costBreakdown.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.item}</td>
                          <td className="text-end fw-bold">{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Accommodations */}
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Recommended Accommodations</h5>
                </div>
                <div className="card-body">
                  {destination.accommodations.map((acc, idx) => (
                    <div key={idx} className="border-bottom pb-3 mb-3">
                      <h6 className="fw-bold">{acc.name}</h6>
                      <p className="text-muted small mb-2">{acc.description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="fw-bold">₱{acc.price.toLocaleString()}/night</span>
                          <div className="d-flex gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <AiFillStar
                                key={i}
                                size={14}
                                className={i < Math.floor(acc.stars) ? 'text-warning' : 'text-light'}
                              />
                            ))}
                            <span className="small text-muted">{acc.stars}</span>
                          </div>
                        </div>
                        <button className="btn btn-sm btn-primary">Book Now</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Reviews */}
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Traveler Reviews</h5>
                </div>
                <div className="card-body">
                  {destination.userReviews.map((review, idx) => (
                    <div key={idx} className="border-bottom pb-3 mb-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="fw-bold mb-1">{review.author}</h6>
                          <div className="d-flex gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <AiFillStar
                                key={i}
                                size={14}
                                className={i < Math.floor(review.rating) ? 'text-warning' : 'text-light'}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="mb-0">{review.comment}</p>
                    </div>
                  ))}

                  <button
                    className="btn btn-primary w-100 mt-3"
                    onClick={() => setShowReviewForm(!showReviewForm)}
                  >
                    {showReviewForm ? 'Cancel' : 'Write Your Review'}
                  </button>

                  {showReviewForm && (
                    <div className="mt-3 p-3 bg-light rounded">
                      <h6 className="fw-bold mb-3">Share Your Experience</h6>

                      <div className="mb-3">
                        <label className="form-label fw-bold">Rating</label>
                        <div className="d-flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              className={`btn btn-lg p-0 ${
                                userRating >= star ? 'text-warning' : 'text-light'
                              }`}
                              onClick={() => setUserRating(star)}
                              style={{ fontSize: '24px', border: 'none', background: 'none' }}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold">Your Review</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Share your experience..."
                          value={userReview}
                          onChange={(e) => setUserReview(e.target.value)}
                        ></textarea>
                      </div>

                      <button
                        className="btn btn-success w-100"
                        onClick={handleSubmitReview}
                      >
                        Submit Review
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              {/* Travel Info Card */}
              <div className="card shadow-sm sticky-top" style={{ top: '80px' }}>
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">Quick Info</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <h6 className="fw-bold">Best Time to Visit</h6>
                    <p className="mb-0">{destination.bestVisitTime}</p>
                  </div>

                  <div className="mb-3">
                    <h6 className="fw-bold">Weather</h6>
                    <p className="mb-0">{destination.weatherInfo}</p>
                  </div>

                  <div className="mb-3">
                    <h6 className="fw-bold">Vibe & Atmosphere</h6>
                    <p className="mb-0">{destination.vibeAndAtmosphere}</p>
                  </div>

                  <a
                    href="/itinerary-builder"
                    className="btn btn-primary w-100"
                  >
                    Add to Itinerary
                  </a>
                </div>
              </div>

              {/* Related Destinations */}
              <div className="card shadow-sm mt-3">
                <div className="card-header bg-info text-white">
                  <h5 className="mb-0">If You Like This...</h5>
                </div>
                <div className="card-body">
                  {destination.relatedDestinations.map((related) => (
                    <div key={related.id} className="mb-2">
                      <button
                        className="btn btn-outline-secondary w-100 text-start"
                        onClick={() => navigate(`/destination/${related.id}`)}
                      >
                        <div>
                          <strong>{related.name}</strong>
                          <br />
                          <small className="text-muted">{related.match}</small>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DestinationDetailPage;
