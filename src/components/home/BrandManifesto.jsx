import React from 'react';

/**
 * BrandManifesto Component
 * A layout featuring a split-grid: 
 * - Left: Overlapping product imagery.
 * - Right: The brand's comeback story.
 */
const BrandManifesto = () => {
  return (
    <section className="brand-manifesto">
      <div className="container">
        
        {/* Main Heading: Positioned at the top of the section */}
        <h2 className="manifesto-heading">
          A New Chapter, A Shared Standard.
        </h2>
        
        <div className="manifesto-grid">
          
          {/* LEFT COLUMN: Image Composition
            The "img-back" and "img-front" classes should handle 
            the absolute/relative positioning in your CSS. 
          */}
          <div className="manifesto-images">
            {/* Background Image: Recycled Wool Overcoat */}
            <img 
              src="https://res.cloudinary.com/dd0jdnlj4/image/upload/v1775922022/Recycled_Wool_Overcoat_A_fmqglz.png" 
              alt="Recycled Wool Overcoat" 
              className="img-back"
            />
            {/* Foreground Image: Canvas Weekender Bag */}
            <img 
              src="https://res.cloudinary.com/dd0jdnlj4/image/upload/v1775922840/Canvas_Weekender_Bag_A_zwi6zb.png" 
              alt="Canvas Weekender Bag" 
              className="img-front"
            />
          </div>

          {/* RIGHT COLUMN: Narrative Content
            Formatted with standard paragraph spacing for readability.
          */}
          <div className="manifesto-text">
            <p className="manifesto-salutation">To our Elavate community,</p>
            
            <p>
              We told you this wasn't the end of our story, just a necessary 
              pause to return to what matters. Today, we're keeping that promise.
            </p>
            
            <p>
              Elavate returns with clarity and intention: focused on 
              craftsmanship, natural fibers, and the dependable essentials 
              that defined us from day one.
            </p>
            
            <p>
              We're rebuilding thoughtfully, not hurriedly; through limited 
              and intentional drops, beginning this March with a refined 
              selection of men's core styles.
            </p>
            
            <p>
              Thank you for your patience, your loyalty, and your belief in 
              the brand. This next chapter is built with purpose, and we're 
              proud to move forward with you.
            </p>
          </div>

        </div> {/* End .manifesto-grid */}
      </div> {/* End .container */}
    </section>
  );
};

export default BrandManifesto;