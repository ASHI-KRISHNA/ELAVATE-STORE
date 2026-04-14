import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Menu, ChevronDown } from 'lucide-react';

/**
 * Navbar Component
 * Features a dual-layer header including:
 * 1. An auto-rotating announcement bar.
 * 2. A primary navigation bar with brand logo and utility icons.
 */
const Navbar = () => {
  // --- Announcement Data ---
  const announcements = [
    "Still Proudly Canadian",
    "Free shipping on orders above $99 CAD"
  ];

  // --- State & Logic ---
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);

  useEffect(() => {
    // Rotates the announcement message every 3 seconds
    const timer = setInterval(() => {
      setCurrentMsgIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 3000);
    
    /**
     * CLEANUP: Essential to clear the interval when the component unmounts
     * to prevent memory leaks and unexpected behavior.
     */
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <header className="site-header">
      
      {/* SECTION: ANNOUNCEMENT BAR */}
      <div className="announcement-bar">
        <div className="announcement-container">
          
          <div className="announcement-col left">
            {/* Reserved for social links or secondary info */}
          </div>
          
          <div className="announcement-col center">
            {/* The 'key' attribute ensures React treats each message as a 
                unique element, which is vital for CSS 'in/out' animations. */}
            <span className="rotating-text" key={currentMsgIndex}>
              {announcements[currentMsgIndex]}
            </span>
          </div>
          
          <div className="announcement-col right">
            <div className="language-selector">
              <span>English</span>
              <ChevronDown size={14} strokeWidth={2} />
            </div>
          </div>
          
        </div>
      </div>

      {/* SECTION: MAIN NAVIGATION */}
      <nav className="navbar">
        <div className="nav-container">
          
          {/* Desktop Links & Mobile Menu Trigger */}
          <div className="nav-section left">
            <ul className="nav-links">
              <li><a href="/collections/men">Men</a></li>
              <li><a href="/about">Our Story</a></li>
            </ul>
            <Menu className="mobile-menu-icon" size={20} strokeWidth={1.5} />
          </div>

          {/* Brand Identity */}
          <div className="nav-section center">
            <h1 className="brand-logo">ELAVATE</h1>
          </div>

          {/* Utility Icons: Search, Account, and Cart */}
          <div className="nav-section right">
            <div className="icon-group">
              <Search size={20} strokeWidth={1.5} className="nav-icon" />
              <User size={20} strokeWidth={1.5} className="nav-icon" />
              
              <div className="cart-container">
                <ShoppingBag size={20} strokeWidth={1.5} className="nav-icon" />
                {/* Cart Badge: Should be dynamic based on global cart state */}
                <span className="cart-badge">0</span>
              </div>
            </div>
          </div>

        </div> {/* End .nav-container */}
      </nav>
    </header>
  );
};

export default Navbar;