import React from 'react';

/**
 * Renders an infinite scrolling text banner for promotional offers.
 * Utilizes a duplicated content group with `aria-hidden="true"` to create 
 * a seamless visual loop without disrupting screen reader accessibility.
 *
 * @returns {JSX.Element} The PromoMarquee component.
 */
const PromoMarquee = () => {
  return (
    <div className="promo-marquee-container">
      <div className="promo-marquee-track">
        
        <div className="marquee-group">
          <span className="marquee-outline">20% OFF SITEWIDE</span>
          <span className="marquee-solid">USE CODE: BACK20</span>
          
          <span className="marquee-outline">20% OFF SITEWIDE</span>
          <span className="marquee-solid">USE CODE: BACK20</span>
          
          <span className="marquee-outline">20% OFF SITEWIDE</span>
          <span className="marquee-solid">USE CODE: BACK20</span>
        </div>

        <div className="marquee-group" aria-hidden="true">
          <span className="marquee-outline">20% OFF SITEWIDE</span>
          <span className="marquee-solid">USE CODE: BACK20</span>
          
          <span className="marquee-outline">20% OFF SITEWIDE</span>
          <span className="marquee-solid">USE CODE: BACK20</span>
          
          <span className="marquee-outline">20% OFF SITEWIDE</span>
          <span className="marquee-solid">USE CODE: BACK20</span>
        </div>

      </div>
    </div>
  );
};

export default PromoMarquee;