import React from 'react';
import CategoryHighlights from '../components/home/CategoryHighlights';

/**
 * Renders the About page, detailing the brand's story, evolution, 
 * and core philosophy through a mix of narrative text and overlapping imagery.
 * Includes the CategoryHighlights component for quick navigation to collections.
 *
 * @returns {JSX.Element} The About page component.
 */
const About = () => {
  return (
    <div className="about-page">
      
      <section className="about-hero">
        <div className="about-hero-bg">
          <img 
            src="https://res.cloudinary.com/dd0jdnlj4/image/upload/v1775922022/Recycled_Wool_Overcoat_A_fmqglz.png" 
            alt="Elavate Coat" 
          />
        </div>
        <div className="about-hero-overlay"></div>
        <h1 className="about-hero-title">The New Standard</h1>
      </section>

      <section className="about-story-block">
        <div className="container story-grid">
          <div className="story-images left-overlap">
            <img 
              src="https://res.cloudinary.com/dd0jdnlj4/image/upload/v1775922534/Essential_Crewneck_Tee_A_mpfus9.png" 
              className="img-back" alt="Crewneck" 
            />
            <img 
              src="https://res.cloudinary.com/dd0jdnlj4/image/upload/v1775922840/Canvas_Weekender_Bag_A_zwi6zb.png" 
              className="img-front" alt="Bag" 
            />
          </div>
          <div className="story-text">
            <h2>A New Chapter, A Shared Standard.</h2>
            <p>We told you this wasn't the end of our story, just a necessary pause to return to what matters. Today, we're keeping that promise.</p>
            <p>Elavate returns with clarity and intention: focused on craftsmanship, natural fibers, and the dependable essentials that defined us from day one.</p>
          </div>
        </div>
      </section>

      <section className="about-story-block">
        <div className="container story-grid reverse">
          <div className="story-text">
            <h2>The Evolution of a Canadian Icon</h2>
            <p>To move forward, we looked back. Our design team dove into our archives to strip away the excess and refine our core silhouettes.</p>
            <p>The result is a collection built for longevity, not passing trends. Every stitch, every button, and every seam has been reconsidered to ensure these garments stand the test of time.</p>
          </div>
          <div className="story-images right-overlap">
            <img 
              src="https://res.cloudinary.com/dd0jdnlj4/image/upload/v1775922772/Skyline_Reversible_Bomber_A_ylg9ep.png" 
              className="img-back" alt="Bomber Jacket" 
            />
            <img 
              src="https://res.cloudinary.com/dd0jdnlj4/image/upload/v1775922502/Organic_Cotton_Oxford_Shirt_A_wqejbq.png" 
              className="img-front" alt="Oxford Shirt" 
            />
          </div>
        </div>
      </section>

      <section className="about-philosophy">
        <div className="container philosophy-container">
          <h2>Our Philosophy</h2>
          <p>Less, but better. It is a simple mantra that guides every decision we make in the studio.</p>
          <p>We believe that true sustainability starts with creating garments that you actually want to wear for years, not just a single season. By utilizing premium organic cottons and recycled wools, we are lowering our impact while raising our standard.</p>
        </div>
      </section>

      <CategoryHighlights />

      <section className="about-cta">
        <div className="cta-bg"></div>
        <h2 className="cta-title">The Essentials, Elevated.</h2>
      </section>

    </div>
  );
};

export default About;