import React from 'react';

/**
 * ProductCard Component
 * Renders an e-commerce "editorial-style" card with a hover-to-reveal image effect.
 * * @param {Object} product - The product data object from the API
 */
const ProductCard = ({ product }) => {
  // --- Image Handling ---
  // Safely extract the primary and secondary images.
  // Fallback to primaryImage if the second array index is undefined.
  const primaryImage = product.image[0];
  const secondaryImage = product.image[1] || primaryImage;

  return (
    <div className="editorial-card">
      
      {/* VISUAL CONTAINER: Handles badges and image transitions */}
      <div className="editorial-image-container">
        <span className="new-badge">New arrival</span>
        
        {/* PRIMARY IMAGE: Shown by default */}
        <img 
          src={primaryImage} 
          alt={product.name} 
          className="editorial-image primary-img" 
        />
        
        {/* SECONDARY IMAGE: 
            Positioned absolutely over the primary image. 
            Visibility should be toggled via CSS opacity on .editorial-card:hover 
        */}
        <img 
          src={secondaryImage} 
          alt={`${product.name} alternate view`} 
          className="editorial-image secondary-img" 
        />
      </div>
      
      {/* PRODUCT DETAILS: Metadata and color swatches */}
      <div className="editorial-info">
        
        {/* Placeholder for color selection logic */}
        <div className="swatch-container">
          <div className="swatch active-swatch"></div>
        </div>
        
        <h3 className="editorial-title">{product.name}</h3>
        
        {/* Price formatted with CAD currency suffix */}
        <p className="editorial-price">
          ${product.price}.00 
        </p>
      </div>

    </div> /* End .editorial-card */
  );
};

export default ProductCard;