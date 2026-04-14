import React from 'react';

/**
 * PromoMarquee Component
 * Implements an infinite scrolling text banner for promotional offers.
 * * Logic: Uses two identical groups of text. While the first group 
 * exits the view, the second follows, creating a seamless loop.
 */
const PromoMarquee = () => {
  return (
    <div className="promo-marquee-container">
      <div className="promo-marquee-track">
        
        {/* PRIMARY CONTENT: 
          The main set of spans visible to all users.
        */}
        <div className="marquee-group">
          <span className="marquee-outline">20% OFF SITEWIDE</span>
          <span className="marquee-solid">USE CODE: BACK20</span>
          
          <span className="marquee-outline">20% OFF SITEWIDE</span>
          <span className="marquee-solid">USE CODE: BACK20</span>
          
          <span className="marquee-outline">20% OFF SITEWIDE</span>
          <span className="marquee-solid">USE CODE: BACK20</span>
        </div>

        {/* DUPLICATE CONTENT: 
          Exactly matches Group 1 to ensure a gap-less transition.
          'aria-hidden="true"' prevents screen readers from announcing 
          the duplicate text twice.
        */}
        <div className="marquee-group" aria-hidden="true">
          <span className="marquee-outline">20% OFF SITEWIDE</span>
          <span className="marquee-solid">USE CODE: BACK20</span>
          
          <span className="marquee-outline">20% OFF SITEWIDE</span>
          <span className="marquee-solid">USE CODE: BACK20</span>
          
          <span className="marquee-outline">20% OFF SITEWIDE</span>
          <span className="marquee-solid">USE CODE: BACK20</span>
        </div>

      </div> {/* End .promo-marquee-track */}
    </div> /* End .promo-marquee-container */
  );
};

export default PromoMarquee;