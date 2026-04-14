import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home'; 
import Collection from './pages/Collection';
// Placeholder for other pages
const PlaceholderPage = ({ title }) => (
  <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
    <h1 style={{ textTransform: 'uppercase', letterSpacing: '0.2em' }}>{title}</h1>
    <p>This section is currently under development.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <main className="main-content">
          <Routes>
            {/* Home Route - Now points to the full page! */}
            <Route path="/" element={<Home />} />
            
            {/* Category Routes */}
            <Route path="/collections/men" element={<PlaceholderPage title="Men's Collection" />} />
            <Route path="/about" element={<PlaceholderPage title="Our Story" />} />
            {/* Dynamic Product Listing Page (PLP) */}
            <Route path="/collections/:categoryId" element={<Collection />} />
            
            {/* Fallback for 404 */}
            <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;