import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../plp/ProductCard';

/**
 * Renders a horizontal, scrollable carousel of products filtered by category.
 * Fetches product data asynchronously and provides programmatic scroll controls.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.title - The display title for the carousel header.
 * @param {string} props.categoryFilter - The exact category string used to filter the API payload.
 * @returns {JSX.Element} The CategoryCarousel component.
 */
const CategoryCarousel = ({ title, categoryFilter }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    setLoading(true);

    fetch('https://api.npoint.io/97e4992f49ffa25befab')
      .then((res) => res.json())
      .then((data) => {
        const filteredProducts = data.products.filter(
          (item) => item.category === categoryFilter
        );
        setProducts(filteredProducts); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error fetching carousel products:", err);
        setLoading(false);
      });
  }, [categoryFilter]);

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
    <section className="grid-section" style={{ paddingTop: '0px' }}>
      <div className="container">
        
        <div className="carousel-header">
          <div className="carousel-title-row">
            <ChevronLeft 
              size={24} 
              strokeWidth={1.5} 
              className="carousel-arrow" 
              onClick={() => scroll('left')} 
            />
            
            <h2 className="carousel-title">{title}</h2>
            
            <ChevronRight 
              size={24} 
              strokeWidth={1.5} 
              className="carousel-arrow" 
              onClick={() => scroll('right')} 
            />
          </div>

          <a 
            href={`/collections/${categoryFilter.toLowerCase()}`} 
            className="view-all-center"
          >
            VIEW ALL
          </a>
        </div>

        {loading ? (
          <div className="loading-state">Loading {title}...</div>
        ) : (
          <div className="product-carousel" ref={carouselRef}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default CategoryCarousel;