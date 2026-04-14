import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../plp/ProductCard';

/**
 * ProductGrid Component
 * Displays a horizontally scrollable "New Arrivals" carousel 
 * fetching data from an external API.
 */
const ProductGrid = () => {
  // --- Initialization ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Reference for the scrollable DOM element
  const carouselRef = useRef(null);

  // --- Data Lifecycle ---
  useEffect(() => {
    fetch('https://api.npoint.io/97e4992f49ffa25befab')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  // --- Navigation Controls ---
  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 320; 
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="grid-section">
      <div className="container">
        
        {/* Carousel UI Controls & Header */}
        <div className="carousel-header">
          <div className="carousel-title-row">
            <ChevronLeft 
              size={24} 
              strokeWidth={1.5} 
              className="carousel-arrow" 
              onClick={() => scroll('left')} 
            />
            
            <h2 className="carousel-title">New arrivals</h2>
            
            <ChevronRight 
              size={24} 
              strokeWidth={1.5} 
              className="carousel-arrow" 
              onClick={() => scroll('right')} 
            />
          </div>
          
          <a href="/collections/men" className="view-all-center">VIEW ALL</a>
        </div>

        {/* Dynamic Content Display */}
        {loading ? (
          <div className="loading-state">Loading Collection...</div>
        ) : (
          <div className="product-carousel" ref={carouselRef}>
            {/* Render subset of products to ensure horizontal overflow for scrolling */}
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div> {/* End .container */}
    </section>
  );
};

export default ProductGrid;