import React from 'react';

// Bootstrap-styled hero using the Bootstrap Carousel
export default function Hero() {
    const slides = [
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&h=800&fit=crop',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&h=800&fit=crop',
        '/Images/mithi-resort-bohol.jpg',
        '/Images/steep-karst-cliffs-of-el-nido-in-palawan_3x2.jpg',
    ];

    return (
        <section className="hero-section">
            <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
                {/* Indicators */}
                <div className="carousel-indicators">
                    {slides.map((_, idx) => (
                        <button
                            type="button"
                            key={idx}
                            data-bs-target="#heroCarousel"
                            data-bs-slide-to={idx}
                            className={idx === 0 ? 'active' : ''}
                            aria-current={idx === 0 ? 'true' : undefined}
                            aria-label={`Slide ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Slides */}
                <div className="carousel-inner">
                    {slides.map((src, idx) => (
                        <div className={`carousel-item ${idx === 0 ? 'active' : ''}`} key={idx}>
                            <img src={src} className="d-block w-100" alt={`Slide ${idx + 1}`} style={{height: '72vh', objectFit: 'cover'}} />
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                {/* Subtle dark overlay so text is readable */}
                <div
                    className="hero-overlay"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.35)',
                        zIndex: 1,
                        pointerEvents: 'none',
                    }}
                />

                {/* Overlay centered text (above the dark overlay) */}
                <div
                    className="carousel-caption d-flex flex-column justify-content-center align-items-center text-center px-3"
                    style={{top: 0, bottom: 0, zIndex: 2}}
                >
                    <h1 className="display-5 fw-bold text-white" style={{textShadow: '0 2px 8px rgba(0,0,0,0.6)'}}>
                        In TravelmateAI,
                    </h1>
                    <p className="lead fw-bold text-white" style={{fontSize: '2rem', textShadow: '0 2px 8px rgba(0,0,0,0.6)'}}>
                        anything is possible
                    </p>
                </div>
            </div>
        </section>
    );
}