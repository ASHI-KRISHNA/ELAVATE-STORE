import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Renders an individual product card for product list pages and carousels.
 * Features a CSS-driven image swap on hover using primary and secondary images, 
 * and links directly to the product detail page.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.product - The product data object.
 * @param {string|number} props.product.id - The unique identifier for the product.
 * @param {string} props.product.name - The display name of the product.
 * @param {number} props.product.price - The price of the product.
 * @param {string[]} props.product.image - Array of image URLs for the product.
 * @returns {JSX.Element} The ProductCard component.
 */
const ProductCard = ({ product }) => {
  const primaryImage = product.image[0];
  const secondaryImage = product.image[1] || primaryImage;

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="editorial-card" 
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <div className="editorial-image-container">
        <span className="new-badge">New arrival</span>
        
        <img 
          src={primaryImage} 
          alt={product.name} 
          className="editorial-image primary-img" 
        />
        
        <img 
          src={secondaryImage} 
          alt={product.name} 
          className="editorial-image secondary-img" 
        />
      </div>
      
      <div className="editorial-info">
       
        <h3 className="editorial-title">{product.name}</h3>
        
        <p className="editorial-price">
          ${product.price}.00 
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;