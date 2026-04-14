import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * ShoppableVideo Component
 * An immersive hero section featuring a background video 
 * and an interactive floating product carousel.
 */
const ShoppableVideo = () => {
  // --- Data Configuration ---
  const featuredProducts = [
    {
      id: 1,
      name: "Organic Cotton Oxford Shirt",
      price: 69,
      image: "https://res.cloudinary.com/dd0jdnlj4/image/upload/v1775922502/Organic_Cotton_Oxford_Shirt_A_wqejbq.png"
    },
    {
      id: 2,
      name: "The Skyline Bomber",
      price: 145,
      image: "https://res.cloudinary.com/dd0jdnlj4/image/upload/v1775922772/Skyline_Reversible_Bomber_A_ylg9ep.png"
    },
    {
      id: 3,
      name: "Essential Crewneck",
      price: 45,
      image: "https://res.cloudinary.com/dd0jdnlj4/image/upload/v1775922534/Essential_Crewneck_Tee_A_mpfus9.png"
    }
  ];

  // --- State Management ---
  // Tracks the index of the currently displayed product in the overlay
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- Navigation Logic ---
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

  // Helper variable for the currently active data object
  const activeProduct = featuredProducts[currentIndex];

  return (
    <section className="shoppable-video-section">
      
      {/* BACKGROUND VIDEO LAYER
          Plays automatically, muted, and loops infinitely. 
      */}
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

      {/* INTERACTIVE OVERLAY LAYER */}
      <div className="video-overlay-content">
        
        {/* Marketing Copy */}
        <div className="video-text-group">
          <span className="video-subtitle">The Original Standard</span>
          <h2 className="video-title">The Fall Collection</h2>
        </div>

        {/* Shoppable Product Card UI */}
        <div className="interactive-card-wrapper">
          
          {/* Carousel Navigation Buttons */}
          <div className="card-controls">
            <button className="control-btn" onClick={handlePrev} aria-label="Previous product">
              <ChevronLeft size={16} strokeWidth={2} />
            </button>
            <button className="control-btn" onClick={handleNext} aria-label="Next product">
              <ChevronRight size={16} strokeWidth={2} />
            </button>
          </div>

          {/* Dynamic Floating Product Card */}
          <a 
            href={`/collections/products/${activeProduct.id}`} 
            className="floating-product-card"
          >
            <div className="fpc-image-container">
              {/* The 'key' attribute triggers a re-render/animation when the product changes */}
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

        </div> {/* End .interactive-card-wrapper */}
      </div> {/* End .video-overlay-content */}
    </section>
  );
};

export default ShoppableVideo;