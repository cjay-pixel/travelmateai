import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MdClose, MdAdd } from 'react-icons/md';
import { BsDownload, BsShare } from 'react-icons/bs';

function ItineraryBuilderPage() {
  const navigate = useNavigate();
  const [itineraryName, setItineraryName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState([]);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [destinationSearch, setDestinationSearch] = useState('');
  const [showTravelTips, setShowTravelTips] = useState(true);

  const destinations = [
    { id: 1, name: 'Manila', region: 'NCR', travelTime: '0h (Start)' },
    { id: 2, name: 'Boracay Island', region: 'Western Visayas', travelTime: '2h flight' },
    { id: 3, name: 'Palawan', region: 'MIMAROPA', travelTime: '1.5h flight' },
    { id: 4, name: 'Cebu City', region: 'Central Visayas', travelTime: '1h flight' },
    { id: 5, name: 'Chocolate Hills', region: 'Central Visayas', travelTime: '1.5h drive from airport' },
    { id: 6, name: 'Sagano', region: 'Cordillera', travelTime: '8h drive' },
    { id: 7, name: 'Ilocos Region', region: 'Ilocos', travelTime: '5h drive' },
    { id: 8, name: 'Camiguin Island', region: 'Northern Mindanao', travelTime: '2h flight' },
  ];

  const travelTips = [
    { title: 'Visa Information', content: 'Most travelers get 30 days visa-free entry to Philippines. Check current requirements.' },
    { title: 'Safety Tips', content: 'Avoid isolated areas at night, use registered taxis/Grab, and keep valuables secure.' },
    { title: 'Transportation', content: 'Domestic flights are affordable. Consider booking in advance. Roads can be slow in some areas.' },
    { title: 'Weather', content: 'Typhoon season is June-November. Dry season (Nov-May) is best for most regions.' },
    { title: 'Budget Tips', content: 'Local food is cheap. Street food is safe and delicious. Use ATMs in cities, not all areas have card readers.' },
  ];

  const filteredDestinations = destinations.filter((d) =>
    d.name.toLowerCase().includes(destinationSearch.toLowerCase()) ||
    d.region.toLowerCase().includes(destinationSearch.toLowerCase())
  );

  const handleAddDestinationDay = (destination) => {
    const newDay = {
      dayNumber: days.length + 1,
      destination: destination.name,
      travelTime: destination.travelTime,
      activities: [],
      notes: '',
    };
    setDays([...days, newDay]);
    setShowDestinationModal(false);
    setDestinationSearch('');
  };

  const handleRemoveDay = (index) => {
    setDays(days.filter((_, i) => i !== index).map((day, idx) => ({ ...day, dayNumber: idx + 1 })));
  };

  const handleAddActivity = (dayIndex) => {
    const newDays = [...days];
    newDays[dayIndex].activities.push('');
    setDays(newDays);
  };

  const handleUpdateActivity = (dayIndex, actIndex, value) => {
    const newDays = [...days];
    newDays[dayIndex].activities[actIndex] = value;
    setDays(newDays);
  };

  const handleRemoveActivity = (dayIndex, actIndex) => {
    const newDays = [...days];
    newDays[dayIndex].activities.splice(actIndex, 1);
    setDays(newDays);
  };

  const handleUpdateDayNotes = (dayIndex, notes) => {
    const newDays = [...days];
    newDays[dayIndex].notes = notes;
    setDays(newDays);
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleExportPDF = () => {
    const itinerary = {
      name: itineraryName || 'My Itinerary',
      dates: `${startDate} to ${endDate}`,
      days,
      exportDate: new Date().toLocaleDateString(),
    };
    console.log('Exporting PDF:', itinerary);
    alert('PDF export functionality ready for backend integration!\nItinerary: ' + itineraryName);
  };

  const handleShareLink = () => {
    const shareLink = `${window.location.origin}/shared-itinerary/${Date.now()}`;
    navigator.clipboard.writeText(shareLink);
    alert('Share link copied to clipboard:\n' + shareLink);
  };

  const handleSaveItinerary = () => {
    if (!itineraryName || !startDate || !endDate) {
      alert('Please fill in name and dates');
      return;
    }

    const itinerary = {
      id: Date.now(),
      name: itineraryName,
      startDate,
      endDate,
      days,
      createdAt: new Date().toISOString(),
    };

    const existingItineraries = JSON.parse(localStorage.getItem('travelmate_itineraries') || '[]');
    existingItineraries.push(itinerary);
    localStorage.setItem('travelmate_itineraries', JSON.stringify(existingItineraries));

    alert('Itinerary saved successfully!');
    navigate('/profile');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main className="flex-grow-1 py-5" style={{ backgroundColor: '#f9f9f9' }}>
        <div className="container">
          <h1 className="mb-4">Itinerary Builder</h1>

          {/* Form Section */}
          <div className="row mb-5">
            <div className="col-lg-8">
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Trip Details</h5>
                </div>
                <div className="card-body">
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Itinerary Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., Summer Beach Adventure"
                        value={itineraryName}
                        onChange={(e) => setItineraryName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Total Days: {calculateDays()}</label>
                      <div className="row g-2">
                        <div className="col-6">
                          <input
                            type="date"
                            className="form-control"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </div>
                        <div className="col-6">
                          <input
                            type="date"
                            className="form-control"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Days List */}
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Daily Itinerary</h5>
                  <button
                    className="btn btn-sm btn-light"
                    onClick={() => setShowDestinationModal(true)}
                  >
                    <MdAdd size={18} /> Add Destination
                  </button>
                </div>

                {days.length === 0 ? (
                  <div className="card-body text-center text-muted py-5">
                    <p>No destinations added yet. Click "Add Destination" to start building your itinerary.</p>
                  </div>
                ) : (
                  <div className="card-body">
                    {days.map((day, dayIndex) => (
                      <div key={dayIndex} className="border rounded p-3 mb-3">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div>
                            <h6 className="mb-0">Day {day.dayNumber}</h6>
                            <h4 className="mb-1">{day.destination}</h4>
                            <small className="text-muted">{day.travelTime}</small>
                          </div>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveDay(dayIndex)}
                          >
                            <MdClose /> Remove
                          </button>
                        </div>

                        {/* Activities */}
                        <div className="mb-3">
                          <label className="form-label fw-bold small">Activities</label>
                          {day.activities.length === 0 ? (
                            <p className="small text-muted mb-0">No activities added</p>
                          ) : (
                            <div className="ps-3">
                              {day.activities.map((activity, actIdx) => (
                                <div key={actIdx} className="input-group input-group-sm mb-2">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g., Beach swimming, Restaurant lunch"
                                    value={activity}
                                    onChange={(e) => handleUpdateActivity(dayIndex, actIdx, e.target.value)}
                                  />
                                  <button
                                    className="btn btn-outline-danger"
                                    type="button"
                                    onClick={() => handleRemoveActivity(dayIndex, actIdx)}
                                  >
                                    <MdClose />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                          <button
                            className="btn btn-sm btn-outline-secondary mt-2"
                            onClick={() => handleAddActivity(dayIndex)}
                          >
                            <MdAdd size={14} /> Add Activity
                          </button>
                        </div>

                        {/* Notes */}
                        <div>
                          <label className="form-label fw-bold small">Notes & Tips</label>
                          <textarea
                            className="form-control form-control-sm"
                            rows="2"
                            placeholder="Add notes about this day (lodging, meals, important info)"
                            value={day.notes}
                            onChange={(e) => handleUpdateDayNotes(dayIndex, e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {days.length > 0 && (
                <div className="d-flex gap-2 mb-4">
                  <button className="btn btn-success flex-grow-1" onClick={handleSaveItinerary}>
                    Save Itinerary
                  </button>
                  <button className="btn btn-outline-primary flex-grow-1" onClick={handleExportPDF}>
                    <BsDownload /> Export PDF
                  </button>
                  <button className="btn btn-outline-info flex-grow-1" onClick={handleShareLink}>
                    <BsShare /> Share Link
                  </button>
                </div>
              )}
            </div>

            {/* Travel Tips Sidebar */}
            <div className="col-lg-4">
              <div className="card shadow-sm sticky-top" style={{ top: '80px' }}>
                <div
                  className="card-header bg-info text-white d-flex justify-content-between align-items-center"
                  role="button"
                  onClick={() => setShowTravelTips(!showTravelTips)}
                  style={{ cursor: 'pointer' }}
                >
                  <h5 className="mb-0">Travel Tips for Beginners</h5>
                  <span>{showTravelTips ? '▼' : '▶'}</span>
                </div>

                {showTravelTips && (
                  <div className="card-body">
                    {travelTips.map((tip, idx) => (
                      <div key={idx} className="mb-3">
                        <h6 className="fw-bold mb-1">{tip.title}</h6>
                        <p className="small text-muted mb-0">{tip.content}</p>
                        {idx < travelTips.length - 1 && <hr className="my-2" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Destination Modal */}
      {showDestinationModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          role="dialog"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Select Destination</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowDestinationModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Search destination or region..."
                  value={destinationSearch}
                  onChange={(e) => setDestinationSearch(e.target.value)}
                />

                <div className="row g-2">
                  {filteredDestinations.map((dest) => (
                    <div key={dest.id} className="col-md-6">
                      <button
                        className="card text-start w-100 p-3 border-0 shadow-sm"
                        onClick={() => handleAddDestinationDay(dest)}
                        style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                      >
                        <h6 className="mb-1">{dest.name}</h6>
                        <p className="small text-muted mb-1">{dest.region}</p>
                        <p className="small mb-0">Travel: {dest.travelTime}</p>
                      </button>
                    </div>
                  ))}
                </div>

                {filteredDestinations.length === 0 && (
                  <div className="alert alert-info">No destinations match your search.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ItineraryBuilderPage;
