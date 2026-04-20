import React from 'react';

/**
 * Renders the global footer component containing brand information, 
 * navigation links, support resources, and a newsletter subscription form.
 *
 * @returns {JSX.Element} The Footer component.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        
        <div className="footer-column">
          <h2 className="footer-logo">ELAVATE</h2>
          <p className="brand-mission">
            Minimalist menswear designed in Canada. <br />
            Sustainable essentials for the modern man.
          </p>
          <div className="social-links footer-social-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">INSTAGRAM</a>
            <span className="social-divider">|</span>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">TWITTER</a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Shop</h3>
          <ul>
            <li><a href="/collections/all">Men's Collection</a></li>
            <li><a href="/collections/all">New Arrivals</a></li>
            <li><a href="/collections/accessories">Accessories</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Support</h3>
          <ul>
            <li><a href="/shipping">Shipping & Returns</a></li>
            <li><a href="/size-guide">Size Guide</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Join the Club</h3>
          <p className="footer-newsletter-text">
            Subscribe for early access and 10% off your first order.
          </p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email Address" required />
            <button type="submit">Join</button>
          </form>
        </div>

      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} ELAVATE. All Rights Reserved.</p>
        <p className="footer-designed-in">
            DESIGNED IN CANADA
        </p>
      </div>
    </footer>
  );
};

export default Footer;