import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, HelpCircle, Tag, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

/**
 * Renders the checkout page layout with functional form handling, 
 * dynamic cart integration, and 20% discount logic.
 *
 * @returns {JSX.Element} The functional Checkout component.
 */
const Checkout = () => {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();

  // 1. Controlled Form State
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    province: 'ON'
  });

  // 2. Coupon & Discount State
  const [couponInput, setCouponInput] = useState('');
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = () => {
    if (couponInput.trim().toUpperCase() === 'BACK20') {
      setIsDiscountApplied(true);
      setCouponInput('');
    } else {
      alert("Invalid coupon code. Try 'BACK20'");
    }
  };

  // 3. Dynamic Price Calculations
  const discountAmount = isDiscountApplied ? cartTotal * 0.20 : 0;
  const finalTotal = cartTotal - discountAmount;

  const handlePayNow = (e) => {
    e.preventDefault();
    console.log("Processing order for:", formData, "Total:", finalTotal);
    alert("Thank you for your order!");
  };

  return (
    <div className="checkout-layout">
      <div className="checkout-main">
        <div className="express-checkout">
          <p>Express checkout</p>
          <div className="express-buttons">
            <button className="btn-express shop-pay">Shop Pay</button>
            <button className="btn-express paypal">PayPal</button>
          </div>
          <div className="divider"><span>OR</span></div>
        </div>

        <form className="checkout-form" onSubmit={handlePayNow}>
          <section className="form-section">
            <div className="section-header-row">
              <h2>Contact</h2>
              <button type="button" onClick={() => navigate('/login')} className="sign-in-link">Sign in</button>
            </div>
            <input 
              name="email"
              type="email" 
              placeholder="Email" 
              required 
              className="checkout-input" 
              value={formData.email}
              onChange={handleInputChange}
            />
          </section>

          <section className="form-section">
            <h2>Delivery</h2>
            <div className="input-row">
              <input name="firstName" type="text" placeholder="First name" className="checkout-input half" onChange={handleInputChange} required />
              <input name="lastName" type="text" placeholder="Last name" className="checkout-input half" onChange={handleInputChange} required />
            </div>

            <div className="input-icon-wrapper">
              <input name="address" type="text" placeholder="Address" className="checkout-input" onChange={handleInputChange} required />
              <Search className="input-icon" size={18} />
            </div>

            <div className="input-row three-col">
              <input name="city" type="text" placeholder="City" className="checkout-input" onChange={handleInputChange} required />
              <div className="select-wrapper">
                <select name="province" className="checkout-input" value={formData.province} onChange={handleInputChange}>
                  <option value="ON">Ontario</option>
                  <option value="QC">Quebec</option>
                  <option value="BC">British Columbia</option>
                </select>
                <ChevronDown className="select-icon" size={16} />
              </div>
              <input name="postalCode" type="text" placeholder="Postal code" className="checkout-input" onChange={handleInputChange} required />
            </div>
          </section>

          <button type="submit" className="btn-pay-now">Pay now</button>
        </form>
      </div>

      <div className="checkout-sidebar">
        <div className="sidebar-content">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.selectedSize}`} className="summary-product">
              <div className="product-image-container">
                <img src={Array.isArray(item.image) ? item.image[0] : item.image} alt={item.name} />
                <span className="item-quantity">{item.quantity}</span>
              </div>
              <div className="product-details">
                <h3>{item.name.toUpperCase()}</h3>
                <p className="size">{item.selectedSize}</p>
              </div>
              <div className="product-pricing">
                <span className="final-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}

          {/* 4. Functional Coupon Input in Sidebar */}
          <div className="discount-section" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <input 
              type="text" 
              placeholder="Discount code" 
              className="checkout-input" 
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="button" onClick={handleApplyCoupon} className="btn-apply">Apply</button>
          </div>

          <div className="pricing-breakdown" style={{ marginTop: '20px' }}>
            <div className="pricing-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            
            {isDiscountApplied && (
              <div className="pricing-row" style={{ color: '#D93025' }}>
                <span className="flex-align"><Tag size={14} style={{ marginRight: '5px' }}/> BACK20</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="pricing-row">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
          </div>

          <div className="checkout-total">
            <span>Total</span>
            <div className="total-price">
              <span className="currency">CAD</span>
              <strong>${finalTotal.toFixed(2)}</strong>
            </div>
          </div>

          {isDiscountApplied && (
            <div className="total-savings" style={{ marginTop: '10px', fontSize: '0.85rem', color: '#666' }}>
                <Tag size={14} /> TOTAL SAVINGS ${discountAmount.toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;