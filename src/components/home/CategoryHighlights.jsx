import React from 'react';

/**
 * Renders a grid of visual navigation links highlighting core product categories.
 * Maps static configuration data to clickable image blocks.
 *
 * @returns {JSX.Element} The CategoryHighlights component.
 */
const CategoryHighlights = () => {
  const categories = [
    { 
      name: 'Shirts', 
      image: 'https://res.cloudinary.com/dd0jdnlj4/image/upload/v1775922502/Organic_Cotton_Oxford_Shirt_A_wqejbq.png' 
    },
    { 
      name: 'T-Shirts', 
      image: 'https://res.cloudinary.com/dd0jdnlj4/image/upload/v1775922534/Essential_Crewneck_Tee_A_mpfus9.png' 
    },
    { 
      name: 'Jackets', 
      image: 'https://res.cloudinary.com/dd0jdnlj4/image/upload/v1775922772/Skyline_Reversible_Bomber_A_ylg9ep.png' 
    },
    { 
      name: 'Pants', 
      image: 'https://res.cloudinary.com/dd0jdnlj4/image/upload/v1775922537/Loose_Fit_Chino_A_bbebgl.png' 
    }
  ];

  return (
    <section className="category-highlights">
      <div className="container">
        
        <h2 className="section-heading">Rediscover your favourites</h2>
        
        <div className="category-blocks">
          {categories.map((cat, index) => (
            <a 
              href={`/collections/${cat.name.toLowerCase()}`} 
              key={index} 
              className="category-block"
            >
              <div className="category-image-wrapper">
                <img src={cat.image} alt={cat.name} />
              </div>
              
              <span className="category-name">{cat.name}</span>
            </a>
          ))}
        </div> 

      </div>
    </section>
  );
};

export default CategoryHighlights;