import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Lock, CreditCard, Info, Tag, CheckCircle, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart(); 
  const { currentUser } = useAuth();
  
  const [couponInput, setCouponInput] = useState('');
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Address States
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [formData, setFormData] = useState({ email: '', firstName: '', lastName: '', address: '', city: '', province: '', postalCode: '' });

  useEffect(() => {
    if (!isProcessing && !showSuccessModal && (!cartItems || cartItems.length === 0)) {
      navigate('/cart');
    }
  }, [cartItems, navigate, showSuccessModal, isProcessing]);

  // Fetch saved addresses from Profile
  useEffect(() => {
    if (currentUser?.email) {
      const savedAddresses = JSON.parse(localStorage.getItem(`elavate_addresses_${currentUser.email}`) || '[]');
      setAddresses(savedAddresses);
    }
  }, [currentUser]);

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
  const taxes = subtotalAfterDiscount * 0.13; // Example 13% HST
  const finalTotal = subtotalAfterDiscount + shipping + taxes;

  const createOrderObject = () => {
    const selectedAddress = addresses[selectedAddressIndex];
    
    // Use the selected saved address if available, otherwise fallback to form data (for guests)
    const shippingAddress = selectedAddress ? {
      email: currentUser?.email || formData.email,
      firstName: currentUser?.firstName || formData.firstName || 'Customer',
      lastName: currentUser?.lastName || formData.lastName || '',
      address: selectedAddress.street,
      city: selectedAddress.city,
      province: selectedAddress.state,
      postalCode: selectedAddress.zip,
      country: selectedAddress.country
    } : formData;

    return {
      orderNumber: "ELV-" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: [...cartItems],
      totals: { subtotal, discount: discountAmount, shipping, taxes, total: finalTotal },
      shippingAddress: shippingAddress,
      paymentMethod: "Visa ending in 4242"
    };
  };

  const saveOrderToAccount = (orderData) => {
    const existingOrders = JSON.parse(localStorage.getItem('elavate_orders') || '[]');
    const updatedOrder = {
      ...orderData,
      userEmail: currentUser?.email || formData.email,
      status: 'Processing'
    };
    existingOrders.push(updatedOrder);
    localStorage.setItem('elavate_orders', JSON.stringify(existingOrders));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    
    if (addresses.length === 0 && !formData.address) {
      alert("Please provide or select a shipping address.");
      return;
    }

    setIsProcessing(true);
    const orderData = createOrderObject();
    
    saveOrderToAccount(orderData);
    
    setTimeout(() => {
      if (clearCart) clearCart();
      setIsProcessing(false);
      navigate('/order-confirmation', { state: { order: orderData } });
    }, 2000);
  };

  const handleExpressPayment = (provider) => {
    if (addresses.length === 0 && !formData.address) {
      alert("Please select a shipping address below before using Express Checkout.");
      return;
    }

    setIsProcessing(true);
    const orderData = createOrderObject();
    orderData.paymentMethod = provider;
    
    saveOrderToAccount(orderData);
    
    setTimeout(() => {
      if (clearCart) clearCart();
      navigate('/order-confirmation', { state: { order: orderData } });
    }, 1500); 
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
            <button type="button" className="btn-express shop-pay" onClick={() => handleExpressPayment('Shop Pay')} disabled={isProcessing}>Shop Pay</button>
            <button type="button" className="btn-express paypal" onClick={() => handleExpressPayment('PayPal')} disabled={isProcessing}>PayPal</button>
          </div>
        </div>

        <div className="divider"><span>OR CONTINUE BELOW</span></div>

        <form className="checkout-form" onSubmit={handlePayment}>
          <div className="form-section">
            <div className="section-header-row">
              <h2>Contact</h2>
              {!currentUser && <Link to="/login" className="sign-in-link">Log in</Link>}
            </div>
            {!currentUser && (
              <input type="email" className="checkout-input" placeholder="Email" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
            )}
            {currentUser && <p style={{ color: '#555' }}>Logged in as: <strong>{currentUser.email}</strong></p>}
          </div>

          {/* DELIVERY SECTION - UPDATED TO FETCH FROM PROFILE */}
          <div className="form-section">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={20} /> Delivery Address</h2>
            
            {addresses.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
                {addresses.map((addr, index) => (
                  <label 
                    key={index} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '12px', 
                      padding: '16px', 
                      border: selectedAddressIndex === index ? '2px solid #000' : '1px solid #ddd', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      background: selectedAddressIndex === index ? '#fafafa' : '#fff',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <input 
                      type="radio" 
                      name="address" 
                      checked={selectedAddressIndex === index} 
                      onChange={() => setSelectedAddressIndex(index)}
                      style={{ marginTop: '4px', cursor: 'pointer' }}
                    />
                    <div>
                      <span style={{ fontWeight: selectedAddressIndex === index ? '600' : '500', display: 'block', marginBottom: '4px' }}>
                        {index === 0 ? "Default Address" : `Address ${index + 1}`}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.4' }}>
                        {addr.street}, {addr.city}, {addr.state} {addr.zip}, {addr.country}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              // Fallback form for users with no saved addresses
              <div style={{ marginTop: '15px' }}>
                <div style={{ padding: '12px', background: '#fff9f0', border: '1px solid #f0ad4e', borderRadius: '6px', color: '#8a6d3b', marginBottom: '15px', fontSize: '0.9rem' }}>
                  No saved addresses found. You can add one below or in your Profile.
                </div>
                <div className="input-row">
                  <input type="text" className="checkout-input half" placeholder="First name" required onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                  <input type="text" className="checkout-input half" placeholder="Last name" required onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                </div>
                <input type="text" className="checkout-input" placeholder="Address" required onChange={(e) => setFormData({...formData, address: e.target.value})} />
                <div className="input-row three-col">
                  <input type="text" className="checkout-input" placeholder="City" required onChange={(e) => setFormData({...formData, city: e.target.value})} />
                  <input type="text" className="checkout-input" placeholder="Postal code" required onChange={(e) => setFormData({...formData, postalCode: e.target.value})} />
                </div>
              </div>
            )}
          </div>

          <div className="form-section">
            <h2>Payment</h2>
            <div className="payment-box">
              <div className="payment-header">
                <span style={{ fontWeight: '600' }}>Credit card</span>
                <CreditCard size={20} color="#666" />
              </div>
              <div className="payment-body">
                <input type="text" className="checkout-input" placeholder="Card number" required />
                <div className="input-row">
                  <input type="text" className="checkout-input half" placeholder="MM / YY" required />
                  <input type="text" className="checkout-input half" placeholder="CVV" required />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-pay-now" disabled={isProcessing}>
            {isProcessing ? "PROCESSING..." : `PAY $${finalTotal.toFixed(2)} CAD`}
          </button>
        </form>
      </div>

      <div className="checkout-sidebar">
        <div className="sidebar-content">
          <div className="summary-items">
            {cartItems.map((item, index) => (
              <div key={index} className="summary-product">
                <div className="product-image-container">
                  <img src={Array.isArray(item.image) ? item.image[0] : item.image} alt={item.name} />
                  <div className="item-quantity">{item.quantity}</div>
                </div>
                <div className="product-details">
                  <h3>{item.name}</h3>
                  <p className="size">{item.selectedSize}</p>
                </div>
                <div className="product-pricing">${(Number(item.price) * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="pricing-breakdown">
            <div className="pricing-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            {isDiscountApplied && <div className="pricing-row" style={{ color: '#D93025' }}><span>Discount</span><span>-${discountAmount.toFixed(2)}</span></div>}
            <div className="pricing-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
            <div className="pricing-row"><span>Taxes</span><span>${taxes.toFixed(2)}</span></div>
          </div>
          <div className="checkout-total">
            <span>Total</span>
            <strong>CAD ${finalTotal.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;