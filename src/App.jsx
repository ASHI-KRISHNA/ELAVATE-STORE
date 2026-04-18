import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Collection from './pages/Collection';
import Product from './pages/Product';
import About from './pages/About';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import SizeGuide from "./pages/SizeGuide";
import Contact from "./pages/Contact";
import Shipping from './pages/Shipping'; 
import OrderConfirmation from './pages/OrderConfirmation'
import OrderDetails from './pages/OrderDetails';
/**
 * Renders a fallback UI for undefined routes or features in development.
 * * @param {Object} props - Component properties.
 * @param {string} props.title - The heading text to display.
 * @returns {JSX.Element} The PlaceholderPage component.
 */
const PlaceholderPage = ({ title }) => (
  <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
    <h1 style={{ textTransform: 'uppercase', letterSpacing: '0.2em' }}>{title}</h1>
    <p>This section is currently under development.</p>
  </div>
);

/**
 * Root component of the ELAVATE application.
 * Establishes the global provider hierarchy for Authentication and Cart state,
 * configures the client-side routing table, and defines the global layout 
 * structure including the Navbar and Footer.
 *
 * @returns {JSX.Element} The core App component.
 */
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/collections/:categoryId" element={<Collection />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/size-guide" element={<SizeGuide />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
                <Route path="/order/:orderId" element={<OrderDetails />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;