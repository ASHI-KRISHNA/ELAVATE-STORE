import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../plp/ProductCard';

/**
 * Renders a horizontally scrollable carousel specifically for "New Arrivals".
 * Fetches product data asynchronously and limits the display to a subset of items.
 *
 * @returns {JSX.Element} The ProductGrid component.
 */
const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    fetch('https://api.npoint.io/7384e17282931eb46307')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error fetching new arrivals:", err);
        setLoading(false);
      });
  }, []);

  /**
   * Programmatically scrolls the carousel container.
   * @param {'left'|'right'} direction - The direction to scroll.
   */
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

        {loading ? (
          <div className="loading-state">Loading Collection...</div>
        ) : (
          <div className="product-carousel" ref={carouselRef}>
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default ProductGrid;