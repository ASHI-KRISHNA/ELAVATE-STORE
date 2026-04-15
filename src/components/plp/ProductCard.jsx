import React from 'react';
import { Link } from 'react-router-dom';

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
        <div className="swatch-container">
          <div className="swatch active-swatch"></div>
        </div>
        
        <h3 className="editorial-title">{product.name}</h3>
        
        <p className="editorial-price">
          ${product.price}.00 
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;