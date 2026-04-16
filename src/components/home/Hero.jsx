import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '/src/assets/images/hero-banner.png';

/**
 * Renders the primary hero section for the landing page.
 * Displays a full-width background image with a dark overlay and call-to-action links.
 *
 * @returns {JSX.Element} The Hero component.
 */
const Hero = () => {
  return (
    <section className="hero">
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
            <Link to="/collections/all" className="btn-primary">Shop Men</Link>
            <Link to="/about" className="btn-secondary">Our Story</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;