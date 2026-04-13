import React from 'react';
import { ShoppingBag, Search, User, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        
        {/* LEFT: Navigation Links */}
        <div className="nav-section left">
          <ul className="nav-links">
            <li><a href="/collections/men">Men</a></li>
            <li><a href="/about">Our Story</a></li>
          </ul>
          {/* Mobile Menu Icon (Visible only on small screens) */}
          <Menu className="mobile-menu-icon" size={20} strokeWidth={1.5} />
        </div>

        {/* CENTER: Text-Only Logo */}
        <div className="nav-section center">
          <h1 className="brand-logo">ELAVATE</h1>
        </div>

        {/* RIGHT: User Utilities */}
        <div className="nav-section right">
          <div className="icon-group">
            <div className="search-wrapper">
              <Search size={20} strokeWidth={1.5} className="nav-icon" />
            </div>
            <User size={20} strokeWidth={1.5} className="nav-icon" />
            <div className="cart-container">
              <ShoppingBag size={20} strokeWidth={1.5} className="nav-icon" />
              <span className="cart-badge">0</span>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;