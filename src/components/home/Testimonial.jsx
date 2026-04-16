import React from 'react';
import { Star } from 'lucide-react';

/**
 * Renders a social proof section featuring a customer testimonial alongside
 * the featured product image and a direct call-to-action.
 *
 * @returns {JSX.Element} The Testimonial component.
 */
const Testimonial = () => {
  const productImage = "https://res.cloudinary.com/dd0jdnlj4/image/upload/v1775922502/Organic_Cotton_Oxford_Shirt_A_wqejbq.png";

  return (
    <section className="testimonial-section">
      <div className="container testimonial-container">
        
        <div className="testimonial-content">
          <span className="testimonial-subtitle">What others are saying</span>
          
          <div className="stars-container">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                fill="#1A1A1A" 
                strokeWidth={0} 
                aria-hidden="true" 
              />
            ))}
          </div>
          
          <h2 className="testimonial-quote">
            "Elavate's Oxford shirts are always strong, reliable, stylish, and feel great!"
          </h2>
          
          <span className="testimonial-author">— Eddie F.</span>
        </div>

        <div className="testimonial-visual">
          <div className="testimonial-image-wrapper">
            <img 
              src={productImage} 
              alt="Light Blue Organic Cotton Oxford Shirt" 
            />
          </div>
          
          <a href="/collections/shirts" className="shop-link">
            Shop The Oxford
          </a>
        </div>

      </div>
    </section>
  );
};

export default Testimonial;