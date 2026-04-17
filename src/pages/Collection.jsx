import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import PromoMarquee from '../components/home/PromoMarquee';
import ProductCard from '../components/plp/ProductCard';

/**
 * Renders the Product Listing Page (PLP) for various collections.
 * Handles dynamic data fetching, client-side filtering, sorting, 
 * and collapsible filter sub-sections.
 *
 * @returns {JSX.Element} The Collection page component.
 */
const Collection = () => {
  const { categoryId = "jackets" } = useParams();
  const navigate = useNavigate();
  
  // Data State
  const [products, setProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // UI Toggle State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedFilters, setExpandedFilters] = useState({
    price: true,
    size: true
  });

  // Filter & Sort State
  const [showOutOfStock, setShowOutOfStock] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(275);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState('best-selling');

  const MAX_SLIDER_VALUE = 500; 

  useEffect(() => {
    fetch('https://api.npoint.io/7384e17282931eb46307')
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = [...new Set(data.products.map(item => item.category))];
        setAllCategories(uniqueCategories);

        const filtered = data.products.filter(p => 
          categoryId.toLowerCase() === 'all' || 
          p.category.toLowerCase() === categoryId.toLowerCase()
        );
        
        setProducts(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, [categoryId]);

  const displayedProducts = products
    .filter((product) => {
      if (!showOutOfStock && product.inStock === false) return false;
      if (product.price < minPrice || product.price > maxPrice) return false;
      if (selectedSizes.length > 0 && product.sizes) {
        const hasSize = product.sizes.some(size => selectedSizes.includes(size));
        if (!hasSize) return false;
      }
      return true; 
    })
    .sort((a, b) => {
      if (sortBy === 'price-low-high') return a.price - b.price;
      if (sortBy === 'price-high-low') return b.price - a.price;
      return 0; 
    });

  const toggleSubFilter = (filter) => {
    setExpandedFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };

  const handleMinPriceChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  const handleSizeToggle = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  return (
    <div className="collection-page">
      <PromoMarquee />

      <div className="category-pills-container">
        {allCategories.map((cat, index) => (
          <button 
            key={index} 
            className={`category-pill ${categoryId.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
            onClick={() => navigate(`/collections/${cat.toLowerCase()}`)}
          >
            MEN'S {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="collection-header">
        <h1 className="collection-title">Men's {categoryId}</h1>
        <p className="product-count">{displayedProducts.length} products</p>
      </div>

      <div className={`container collection-layout ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
        
        <aside className="collection-sidebar">
          <div className="filter-header" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <div className="filter-title-group">
              <SlidersHorizontal size={18} />
              <span>Filter</span>
            </div>
            <ChevronDown size={16} className={`filter-chevron ${isSidebarOpen ? 'open' : ''}`} />
          </div>

          {isSidebarOpen && (
            <div className="filter-content-wrapper">
              
              <div className="filter-group toggle-group">
                <span className="filter-label">Out of stock</span>
                <div className="custom-toggle">
                  <button 
                    className={`toggle-btn ${showOutOfStock ? 'active' : ''}`}
                    onClick={() => setShowOutOfStock(true)}
                  >Show</button>
                  <button 
                    className={`toggle-btn ${!showOutOfStock ? 'active' : ''}`}
                    onClick={() => setShowOutOfStock(false)}
                  >Hide</button>
                </div>
              </div>

              {/* PRICE SUB-FILTER */}
              <div className="filter-group">
                <div 
                  className="filter-label-row" 
                  onClick={() => toggleSubFilter('price')}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="filter-label">Price</span>
                  <ChevronDown 
                    size={16} 
                    style={{ 
                        transform: expandedFilters.price ? 'rotate(180deg)' : 'rotate(0deg)', 
                        transition: 'transform 0.3s ease' 
                    }} 
                  />
                </div>
                
                {expandedFilters.price && (
                  <div className="filter-inner-content">
                    <div className="price-inputs">
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          value={minPrice} 
                          onChange={(e) => setMinPrice(Number(e.target.value) || 0)} 
                        />
                      </div>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          value={maxPrice} 
                          onChange={(e) => setMaxPrice(Number(e.target.value) || 0)} 
                        />
                      </div>
                    </div>

                    <div className="range-slider-container">
                      <div 
                        className="slider-track-fill" 
                        style={{ 
                          left: `${(minPrice / MAX_SLIDER_VALUE) * 100}%`, 
                          right: `${100 - (maxPrice / MAX_SLIDER_VALUE) * 100}%` 
                        }}
                      ></div>
                      <input 
                        type="range" min="0" max={MAX_SLIDER_VALUE} 
                        value={minPrice} onChange={handleMinPriceChange} 
                        className="range-input min-range" 
                      />
                      <input 
                        type="range" min="0" max={MAX_SLIDER_VALUE} 
                        value={maxPrice} onChange={handleMaxPriceChange} 
                        className="range-input max-range" 
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* SIZE SUB-FILTER */}
              <div className="filter-group">
                <div 
                  className="filter-label-row" 
                  onClick={() => toggleSubFilter('size')}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="filter-label">Size</span>
                  <ChevronDown 
                    size={16} 
                    style={{ 
                        transform: expandedFilters.size ? 'rotate(180deg)' : 'rotate(0deg)', 
                        transition: 'transform 0.3s ease' 
                    }} 
                  />
                </div>
                
                {expandedFilters.size && (
                  <div className="size-grid">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                      <button 
                        key={size} 
                        className={`size-btn ${selectedSizes.includes(size) ? 'active' : ''}`}
                        onClick={() => handleSizeToggle(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
            </div>
          )}
        </aside>

        <main className="collection-main">
          <div className="collection-controls-right">
            <div className="sort-wrapper">
              <label htmlFor="sort">Sort by:</label>
              <select 
                id="sort" className="sort-select" 
                value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="best-selling">Best selling</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
              <ChevronDown size={14} className="dropdown-arrow" />
            </div>
          </div>

          {loading ? (
            <div className="loading-state">Loading {categoryId}...</div>
          ) : (
            <div className="collection-grid">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default Collection;