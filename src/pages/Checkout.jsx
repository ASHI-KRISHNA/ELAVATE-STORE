import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Lock, CreditCard, Info, Tag, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart(); 
  
  const [couponInput, setCouponInput] = useState('');
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // UPDATED REDIRECT LOGIC
  useEffect(() => {
    // Only redirect if: 
    // 1. We aren't currently processing a payment
    // 2. We haven't finished a payment (modal isn't shown)
    // 3. The cart is empty
    if (!isProcessing && !showSuccessModal && (!cartItems || cartItems.length === 0)) {
      navigate('/cart');
    }
  }, [cartItems, navigate, showSuccessModal, isProcessing]);

  const subtotal = (cartItems || []).reduce((acc, item) => {
    return acc + (Number(item.price) * (Number(item.quantity) || 1));
  }, 0);
  
  const handleApplyCoupon = () => {
    if (couponInput.trim().toUpperCase() === 'BACK20') {
      setIsDiscountApplied(true);
      setCouponInput('');
    } else {
      alert("Invalid coupon code. Try 'BACK20'");
    }
  };

  const discountAmount = isDiscountApplied ? subtotal * 0.20 : 0;
  const subtotalAfterDiscount = subtotal - discountAmount;
  const shipping = subtotal === 0 ? 0 : (subtotalAfterDiscount >= 99 ? 0 : 15);
  const finalTotal = subtotalAfterDiscount + shipping;

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      // Clear cart first while isProcessing is still true to prevent redirect
      if (clearCart && typeof clearCart === 'function') {
        clearCart();
      }
      setIsProcessing(false);
      setShowSuccessModal(true); 
    }, 2000);
  };

  const handleExpressPayment = (provider) => {
    setIsProcessing(true);
    
    setTimeout(() => {
      if (clearCart && typeof clearCart === 'function') {
        clearCart();
      }
      // Navigate to order confirmation
      navigate('/order-confirmation');
      // isProcessing remains true until the component unmounts during navigation
    }, 1500); 
  };

  const handleReturnHome = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  return (
    <div className="checkout-layout">
      <div className="checkout-main">
        <div className="checkout-header">
          <Link to="/" className="checkout-logo">ELAVATE</Link>
          <Link to="/cart" className="sign-in-link">
             <ChevronLeft size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
             Return to Cart
          </Link>
        </div>

        <div className="express-checkout">
          <p>Express Checkout</p>
          <div className="express-buttons">
            <button 
                type="button" 
                className="btn-express shop-pay"
                onClick={() => handleExpressPayment('Shop Pay')}
                disabled={isProcessing}
            >
                Shop Pay
            </button>
            <button 
                type="button" 
                className="btn-express paypal"
                onClick={() => handleExpressPayment('PayPal')}
                disabled={isProcessing}
            >
                PayPal
            </button>
          </div>
        </div>

        <div className="divider">
          <span>OR CONTINUE BELOW</span>
        </div>

        <form className="checkout-form" onSubmit={handlePayment}>
          <div className="form-section">
            <div className="section-header-row">
              <h2>Contact</h2>
              <Link to="/login" className="sign-in-link">Log in</Link>
            </div>
            <input type="email" className="checkout-input" placeholder="Email or mobile phone number" required />
            <label className="checkbox-label">
              <input type="checkbox" />
              Email me with news and offers
            </label>
          </div>

          <div className="form-section">
            <h2>Delivery</h2>
            <div className="select-wrapper">
              <select className="checkout-input">
                <option value="CA">Canada</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
            
            <div className="input-row">
              <input type="text" className="checkout-input half" placeholder="First name" required />
              <input type="text" className="checkout-input half" placeholder="Last name" required />
            </div>
            
            <input type="text" className="checkout-input" placeholder="Address" required />
            <input type="text" className="checkout-input" placeholder="Apartment, suite, etc. (optional)" />
            
            <div className="input-row three-col">
              <input type="text" className="checkout-input" placeholder="City" required />
              <div className="select-wrapper">
                <select className="checkout-input">
                  <option value="">Province</option>
                  <option value="ON">Ontario</option>
                  <option value="BC">British Columbia</option>
                  <option value="QC">Quebec</option>
                </select>
              </div>
              <input type="text" className="checkout-input" placeholder="Postal code" required />
            </div>
          </div>

          <div className="form-section">
            <h2>Payment</h2>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '15px' }}>
              All transactions are secure and encrypted.
            </p>
            
            <div className="payment-box">
              <div className="payment-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '600' }}>Credit card</span>
                <CreditCard size={20} color="#666" />
              </div>
              <div className="payment-body">
                <input type="text" className="checkout-input" placeholder="Card number" required />
                <div className="input-row">
                  <input type="text" className="checkout-input half" placeholder="Expiration date (MM / YY)" required />
                  <input type="text" className="checkout-input half" placeholder="Security code" required />
                </div>
                <input type="text" className="checkout-input" placeholder="Name on card" required />
              </div>
            </div>
          </div>

          <button type="submit" className="btn-pay-now" disabled={isProcessing}>
            {isProcessing ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <Lock size={18} /> PROCESSING...
              </span>
            ) : (
              `PAY $${finalTotal.toFixed(2)} CAD`
            )}
          </button>
        </form>

        <div className="checkout-footer">
          <a href="#">Refund policy</a>
          <a href="#">Shipping policy</a>
          <a href="#">Privacy policy</a>
          <a href="#">Terms of service</a>
        </div>
      </div>

      <div className="checkout-sidebar">
        <div className="sidebar-content">
          <div className="summary-items">
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={`${item.id}-${item.selectedSize}-${index}`} className="summary-product">
                  <div className="product-image-container">
                    <img 
                      src={Array.isArray(item.image) ? item.image[0] : item.image} 
                      alt={item.name} 
                    />
                    <div className="item-quantity">{item.quantity || 1}</div>
                  </div>
                  <div className="product-details">
                    <h3>{item.name}</h3>
                    <p className="size">{item.selectedSize || 'M'}</p>
                  </div>
                  <div className="product-pricing">
                    ${(Number(item.price) * (Number(item.quantity) || 1)).toFixed(2)}
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '30px' }}>
                Your order is processing...
              </p>
            )}
          </div>

          <div className="discount-section">
            <input 
              type="text" 
              className="checkout-input" 
              placeholder="Discount code (Try BACK20)" 
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
            />
            <button type="button" className="btn-apply" onClick={handleApplyCoupon}>Apply</button>
          </div>

          <div className="pricing-breakdown">
            <div className="pricing-row">
              <span>Subtotal</span>
              <span style={{ fontWeight: '500' }}>${subtotal.toFixed(2)}</span>
            </div>
            
            {isDiscountApplied && (
              <div className="pricing-row" style={{ color: '#D93025' }}>
                <span className="flex-align"><Tag size={14} style={{ marginRight: '5px' }}/> BACK20</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="pricing-row">
              <span className="flex-align">Shipping <Info size={14} color="#999" /></span>
              <span style={{ fontWeight: '500' }}>
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="pricing-row">
              <span>Taxes</span>
              <span style={{ color: '#888' }}>Calculated at next step</span>
            </div>
          </div>

          <div className="checkout-total">
            <span>Total</span>
            <div className="total-price">
              <span style={{ fontSize: '0.8rem', color: '#666', verticalAlign: 'middle' }}>CAD</span>
              <strong>${finalTotal.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="auth-modal-overlay">
          <div className="auth-modal-box">
            <CheckCircle size={48} color="#2A3F2D" style={{ margin: '0 auto 20px', display: 'block' }} />
            <h2>Order Confirmed</h2>
            <p>
              Thank you for your purchase! Your payment has been processed successfully.
            </p>
            <div className="auth-modal-actions">
              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '18px' }} 
                onClick={handleReturnHome}
              >
                Return to Homepage
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;