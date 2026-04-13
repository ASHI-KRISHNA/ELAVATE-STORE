import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        
        {/* Column 1: Brand & Socials */}
        <div className="footer-column">
          <h2 className="footer-logo">ELAVATE</h2>
          <p className="brand-mission">
            Minimalist menswear designed in Canada. <br />
            Sustainable essentials for the modern man.
          </p>
          <div className="social-links" style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.1em' }}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">INSTAGRAM</a>
            <span style={{ opacity: 0.2 }}>|</span>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">TWITTER</a>
          </div>
        </div>

        {/* Column 2: Shop Links */}
        <div className="footer-column">
          <h3>Shop</h3>
          <ul>
            <li><a href="/collections/men">Men's Collection</a></li>
            <li><a href="/collections/new">New Arrivals</a></li>
            <li><a href="/collections/essentials">Essentials</a></li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div className="footer-column">
          <h3>Support</h3>
          <ul>
            <li><a href="/shipping">Shipping & Returns</a></li>
            <li><a href="/size-guide">Size Guide</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="footer-column">
          <h3>Join the Club</h3>
          <p style={{ color: '#999', fontSize: '0.85rem', marginBottom: '15px' }}>
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
        <p style={{ marginTop: '10px', opacity: 0.3, fontSize: '0.65rem', letterSpacing: '0.2em' }}>
            DESIGNED IN CANADA
        </p>
      </div>
    </footer>
  );
};

export default Footer;