import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- 1. NEW: Import the Cart Provider (The Brain) ---
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Cart from './pages/Cart';
import Collection from './pages/Collection';
import Product from './pages/Product';
import About from './pages/About';

// Placeholder for other pages
const PlaceholderPage = ({ title }) => (
  <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
    <h1 style={{ textTransform: 'uppercase', letterSpacing: '0.2em' }}>{title}</h1>
    <p>This section is currently under development.</p>
  </div>
);

function App() {
  return (
    /* --- 2. NEW: Wrap the entire Router in the CartProvider --- */
    <CartProvider>
      <Router>
        <div className="App">
          
          {/* Global Navigation - Now safely inside the Provider's coverage area! */}
          <Navbar />
          
          <main className="main-content">
            <Routes>
              {/* Core Pages */}
              <Route path="/" element={<Home />} />
              
             
              
              {/* Dynamic Product Listing Page (PLP) */}
              <Route path="/collections/:categoryId" element={<Collection />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              
              {/* Static Pages & Fallbacks */}
              <Route path="/about" element={<PlaceholderPage title="Our Story" />} />
              <Route path="/about" element={<><Navbar /><main className="main-content"><About /></main><Footer /></>} />
              <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;