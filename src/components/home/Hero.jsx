import React from 'react';
import heroImg from '/src/assets/images/hero-banner.png';
const Hero = () => {
  return (
    <section className="hero">
      {/* The image is now a background element */}
      <div className="hero-visual">
        <img src={heroImg} alt="ELAVATE Collection" className="hero-bg-image" />
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-subtitle">New Collection 2026</span>
          <h1 className="hero-title">Sustainable <br /> Essentials</h1>
          <p className="hero-description">
            Thoughtfully designed in Canada. Crafted for comfort, 
            engineered for longevity.
          </p>
          <div className="hero-actions">
            <button className="btn-primary">Shop Men</button>
            <button className="btn-secondary">Our Story</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;