import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Renders an immersive hero section featuring a looping background video 
 * overlaid with an interactive, floating shoppable product carousel.
 *
 * @returns {JSX.Element} The ShoppableVideo component.
 */
const ShoppableVideo = () => {
  const featuredProducts = [
    {
      id: 2,
      name: "Organic Cotton Oxford Shirt",
      price: 69,
      image: "https://res.cloudinary.com/dd0jdnlj4/image/upload/v1775922502/Organic_Cotton_Oxford_Shirt_A_wqejbq.png"
    },
    {
      id: 1,
      name: "The Skyline Bomber",
      price: 145,
      image: "https://res.cloudinary.com/dd0jdnlj4/image/upload/v1775922772/Skyline_Reversible_Bomber_A_ylg9ep.png"
    },
    {
      id: 5,
      name: "Essential Crewneck",
      price: 45,
      image: "https://res.cloudinary.com/dd0jdnlj4/image/upload/v1775922534/Essential_Crewneck_Tee_A_mpfus9.png"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === featuredProducts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredProducts.length - 1 : prevIndex - 1
    );
  };

  const activeProduct = featuredProducts[currentIndex];

  return (
    <section className="shoppable-video-section">
      
      <video 
        className="video-bg" 
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source 
          src="https://res.cloudinary.com/dd0jdnlj4/video/upload/Fashion_B_Roll_Generation_noewdc.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>

      <div className="video-overlay-content">
        
        <div className="video-text-group">
          <span className="video-subtitle">The Original Standard</span>
          <h2 className="video-title">The Fall Collection</h2>
        </div>

        <div className="interactive-card-wrapper">
          
          <div className="card-controls">
            <button className="control-btn" onClick={handlePrev} aria-label="Previous product">
              <ChevronLeft size={16} strokeWidth={2} />
            </button>
            <button className="control-btn" onClick={handleNext} aria-label="Next product">
              <ChevronRight size={16} strokeWidth={2} />
            </button>
          </div>

          <a 
            href={`product/${activeProduct.id}`} 
            className="floating-product-card"
          >
            <div className="fpc-image-container">
              <img 
                key={activeProduct.id} 
                src={activeProduct.image} 
                alt={activeProduct.name} 
              />
            </div>
            
            <div className="fpc-info">
              <h3>{activeProduct.name}</h3>
              <p>${activeProduct.price}.00</p>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
};

export default ShoppableVideo;