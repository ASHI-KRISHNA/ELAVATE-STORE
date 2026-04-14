import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import Footer from './components/layout/Footer';

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
            {/* Home Route */}
            <Route path="/" element={<Hero />} />
            
            {/* Category Routes */}
            <Route path="/collections/men" element={<PlaceholderPage title="Men's Collection" />} />
            <Route path="/about" element={<PlaceholderPage title="Our Story" />} />
            
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