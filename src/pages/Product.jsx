import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Star, ChevronRight, ShieldCheck, Truck, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

/**
 * Renders the Product Detail Page (PDP).
 * Fetches specific product data based on the URL parameter, displays an image gallery,
 * and handles size selection and cart integration with error validation.
 *
 * @returns {JSX.Element} The Product page component.
 */
const Product = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    fetch('https://api.npoint.io/97e4992f49ffa25befab')
      .then(res => res.json())
      .then(data => {
        const foundProduct = data.products.find(p => p.id.toString() === productId);
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [productId]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    
    setSizeError(false);
    addToCart(product, selectedSize);
  };

  if (loading) return <div className="container loading-state">Loading product details...</div>;
  if (!product) return <div className="container loading-state">Product not found.</div>;

  const images = Array.isArray(product.image) ? product.image : [product.image];

  return (
    <div className="pdp-page">
      <div className="container">
        
        <div className="pdp-breadcrumbs">
          <Link to="/">Home</Link> <ChevronRight size={12} /> 
          <Link to={`/collections/${product.category.toLowerCase()}`}>Men's {product.category}</Link> 
          <ChevronRight size={12} /> 
          <span className="current-crumb">{product.name}</span>
        </div>

        <div className="pdp-layout">
          
          <div className="pdp-gallery">
            <div className="gallery-grid">
              {images.slice(0, 3).map((imgUrl, index) => (
                <div key={index} className={`gallery-item item-${index}`}>
                  <img 
                    src={imgUrl || 'https://placehold.co/600x800/E8E6E1/1A1A1A?text=No+Image'} 
                    alt={`${product.name} - view ${index + 1}`} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/600x800/E8E6E1/1A1A1A?text=No+Image';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pdp-details-wrapper">
            <div className="pdp-details-sticky">
              <div className="pdp-header">
                <h1 className="pdp-title">{product.name}</h1>
                <p className="pdp-price">${product.price}.00 CAD</p>
              </div>

              <div className="pdp-reviews">
                <div className="stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#1A1A1A" strokeWidth={0} />)}
                </div>
                <span>(128 Reviews)</span>
              </div>

              <p className="pdp-description">
                Expertly tailored for a flawless fit. This piece is crafted from premium, sustainable materials designed to elevate your everyday wardrobe. Engineered for comfort and longevity.
              </p>

              <div className="pdp-size-section">
                <div className="size-header">
                  <span className="size-label">Select Size</span>
                  <a href="/size-guide" className="size-guide">Size Guide</a>
                </div>
                
                <div className={`size-grid pdp-sizes ${sizeError ? 'has-error' : ''}`}>
                  {(product.sizes || ['S', 'M', 'L', 'XL', 'XXL']).map((size) => (
                    <button 
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                
                {sizeError && (
                  <div className="size-error-msg">
                    <AlertCircle size={14} /> Please select a size to continue.
                  </div>
                )}
              </div>

              <button className="btn-primary add-to-cart-btn" onClick={handleAddToCart}>
                <ShoppingBag size={20} />
                ADD TO CART • ${product.price}.00
              </button>

              <div className="pdp-perks">
                <div className="perk">
                  <Truck size={20} strokeWidth={1.5} />
                  <span>Free shipping on orders over $99</span>
                </div>
                <div className="perk">
                  <ShieldCheck size={20} strokeWidth={1.5} />
                  <span>Extended 30-day returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;