import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../plp/ProductCard';

/**
 * CategoryCarousel Component
 * Fetches products from an API and displays a scrollable row 
 * based on a specific category filter.
 */
const CategoryCarousel = ({ title, categoryFilter }) => {
  // --- State & Refs ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  // --- Data Fetching ---
  useEffect(() => {
    // Reset loading state if category changes
    setLoading(true);

    fetch('https://api.npoint.io/97e4992f49ffa25befab')
      .then((res) => res.json())
      .then((data) => {
        /**
         * Logic: Filter the raw API response to match 
         * the 'categoryFilter' prop passed from the parent.
         */
        const filteredProducts = data.products.filter(
          (item) => item.category === categoryFilter
        );
        setProducts(filteredProducts); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, [categoryFilter]); // Re-runs if the category filter changes

  // --- Carousel Navigation Logic ---
  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 320; // Distance to scroll per click
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="grid-section" style={{ paddingTop: '0px' }}>
      <div className="container">
        
        {/* Header: Title and Navigation Controls */}
        <div className="carousel-header">
          <div className="carousel-title-row">
            {/* Left Scroll Trigger */}
            <ChevronLeft 
              size={24} 
              strokeWidth={1.5} 
              className="carousel-arrow" 
              onClick={() => scroll('left')} 
            />
            
            <h2 className="carousel-title">{title}</h2>
            
            {/* Right Scroll Trigger */}
            <ChevronRight 
              size={24} 
              strokeWidth={1.5} 
              className="carousel-arrow" 
              onClick={() => scroll('right')} 
            />
          </div>

          {/* Dynamic Link to the Full Collection */}
          <a 
            href={`/collections/${categoryFilter.toLowerCase()}`} 
            className="view-all-center"
          >
            VIEW ALL
          </a>
        </div>

        {/* Content Area: Loading State vs. Scrollable List */}
        {loading ? (
          <div className="loading-state">Loading {title}...</div>
        ) : (
          <div className="product-carousel" ref={carouselRef}>
            {/* Map through the filtered list and render individual ProductCards.
              Ref is attached here to enable programmatic scrolling.
            */}
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div> {/* End .container */}
    </section>
  );
};

export default CategoryCarousel;