import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, ChevronDown, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

/**
 * Renders the global navigation bar, including a rotating announcement banner,
 * main navigation links, user action icons, and an interactive mega-search overlay.
 * Retrieves and displays the current cart item count via CartContext.
 *
 * @returns {JSX.Element} The Navbar component.
 */
const Navbar = () => {
  const { cartCount } = useCart(); 
  const navigate = useNavigate();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);

  const announcements = [
    "Free shipping on orders above $99 CAD",
    "20% OFF SITEWIDE USE CODE: BACK20",
    "NEW ARRIVALS JUST LANDED"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    fetch('https://api.npoint.io/7384e17282931eb46307')
      .then(res => res.json())
      .then(data => setAllProducts(data.products))
      .catch(err => console.error("Search fetch error:", err));
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, allProducts]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections/all`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const getImageUrl = (imageProp) => {
    return Array.isArray(imageProp) ? imageProp[0] : (imageProp || 'https://placehold.co/400x500/E8E6E1/1A1A1A?text=No+Image');
  };

  return (
    <>
      <div className={`search-mega-overlay ${isSearchOpen ? 'open' : ''}`}>
        <div className="search-mega-container">
          
          <div className="search-spacer"></div>

          <form onSubmit={handleSearchSubmit} className="search-mega-form">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-mega-input"
            />
            <button type="submit" className="search-mega-submit">
              <Search size={20} strokeWidth={1.5} />
            </button>
          </form>

          <div className="search-close-wrapper">
            <button onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery(""); 
            }} className="search-mega-close">
              <X size={28} strokeWidth={1} />
            </button>
          </div>
          
        </div>

        <div className="search-mega-results">
          {searchQuery.trim().length === 0 ? (
            <p className="search-empty-text">Type to start searching...</p>
          ) : searchResults.length === 0 ? (
            <p className="search-empty-text">Sorry, we couldn't find any results for "{searchQuery}"</p>
          ) : (
            <div className="search-results-grid">
              {searchResults.slice(0, 4).map((product) => (
                <Link 
                  to={`/product/${product.id}`} 
                  key={product.id} 
                  className="search-result-card"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <div className="src-img-wrapper">
                    <img 
                      src={getImageUrl(product.image)} 
                      alt={product.name} 
                      onError={(e) => e.target.src = 'https://placehold.co/400x500/E8E6E1/1A1A1A?text=No+Image'}
                    />
                  </div>
                  <div className="src-info">
                    <h4>{product.name.toUpperCase()}</h4>
                    <p>${product.price}.00 CAD</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <header className="site-header">
        <div className="announcement-bar">
          <div className="announcement-container">
            <div className="announcement-col"></div>
            <div className="announcement-col center">
              <span key={announcementIndex} className="rotating-text">
                {announcements[announcementIndex]}
              </span>
            </div>
            <div className="announcement-col right">
              <span className="language-selector">
                English <ChevronDown size={12} />
              </span>
            </div>
          </div>
        </div>

        <nav className="navbar">
          <div className="nav-container">
            
            <div className="nav-section">
              <Menu size={24} className="mobile-menu-icon" />
              <ul className="nav-links">
                <li><Link to="/collections/all">Men</Link></li>
                <li><Link to="/about">Our Story</Link></li>
              </ul>
            </div>

            <div className="nav-section center">
              <h1 className="brand-logo" onClick={() => navigate('/')}>
                ELAVATE
              </h1>
            </div>

            <div className="nav-section right">
              <div className="icon-group">
                
                <Search 
                  size={20} 
                  strokeWidth={1.5} 
                  className="nav-icon" 
                  onClick={() => setIsSearchOpen(true)} 
                />

                <Link to="/profile" className="nav-icon-link">
                  <User size={20} strokeWidth={1.5} className="nav-icon" />
                </Link>

                <Link to="/cart" className="cart-container">
                  <ShoppingBag size={20} strokeWidth={1.5} className="nav-icon" />
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </Link>

              </div>
            </div>

          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;