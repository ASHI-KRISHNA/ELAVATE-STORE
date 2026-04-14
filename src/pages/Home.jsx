import React from 'react';
import PromoMarquee from '../components/home/PromoMarquee'; // <--- NEW IMPORT
import Hero from '../components/home/Hero';
import CategoryHighlights from '../components/home/CategoryHighlights';
import BrandManifesto from '../components/home/BrandManifesto';
import ProductGrid from '../components/home/ProductGrid';
import ShoppableVideo from '../components/home/ShoppableVideo';
import Testimonial from '../components/home/Testimonial';
import CategoryCarousel from '../components/home/CategoryCarousel';

const Home = () => {
  return (
    <div className="home-page">
      <PromoMarquee /> 
      <Hero />
      <CategoryHighlights />
      <BrandManifesto />
      <ProductGrid /> 
      <ShoppableVideo />
      <Testimonial />
      <CategoryCarousel title="Pants" categoryFilter="Pants" />
    </div>
  );
};

export default Home;