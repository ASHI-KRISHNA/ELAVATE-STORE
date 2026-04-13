import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePlaceholder />} />
        </Routes>
      </main>
    </Router>
  );
}

// Temporary Placeholder to test the background
const HomePlaceholder = () => (
  <div style={{ height: '200vh', padding: '50px' }}>
    <h2 style={{ textTransform: 'uppercase', letterSpacing: '0.2em', textAlign: 'center' }}>
      Welcome to Elavate
    </h2>
    <p style={{ textAlign: 'center', color: '#666' }}>
      Scroll down to test the sticky navbar...
    </p>
  </div>
);

export default App;