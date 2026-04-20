import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Package, MapPin, CreditCard, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const allOrders = JSON.parse(localStorage.getItem('elavate_orders') || '[]');
    const foundOrder = allOrders.find(o => o.orderNumber === orderId);
    
    if (foundOrder) {
      setOrder(foundOrder);
    }
    
    setLoading(false);
  }, [orderId]);

  if (loading) {
    return (
      <div className="order-details-loading">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-details-error">
        <h2>Order Not Found</h2>
        <p>We couldn't find the order you're looking for.</p>
        <button onClick={() => navigate('/profile')} className="btn-solid mt-sm">
          Return to Profile
        </button>
      </div>
    );
  }

  return (
    <div className="order-details-container">
      
      <div className="order-details-header">
        <Link to="/profile" className="back-link">
          <ChevronLeft size={16} /> Back to Profile
        </Link>
        <h1 className="order-details-title">Order {order.orderNumber}</h1>
        <p className="order-details-date">Placed on {order.date}</p>
        <span className={`status-badge ${(order.status || 'processing').toLowerCase()}`}>
          {order.status || 'Processing'}
        </span>
      </div>

      <div className="order-details-layout">
        
        {/* LEFT COLUMN: ORDER INFO */}
        <div className="order-info-stack">
          
          <div className="info-card">
            <h3 className="info-card-title">
              <Package size={20} strokeWidth={1.5} /> Shipping Method
            </h3>
            <p className="info-card-text">
              {order.totals.shipping === 0 ? 'Free Standard Shipping' : 'Standard Shipping'}
            </p>
          </div>

          <div className="info-card">
            <h3 className="info-card-title">
              <MapPin size={20} strokeWidth={1.5} /> Shipping Address
            </h3>
            <p className="info-card-text">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
              {order.shippingAddress.address}<br />
              {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.postalCode}<br />
              {order.shippingAddress.country && <>{order.shippingAddress.country}</>}
            </p>
          </div>

          <div className="info-card">
            <h3 className="info-card-title">
              <CreditCard size={20} strokeWidth={1.5} /> Payment Details
            </h3>
            <p className="info-card-text">{order.paymentMethod}</p>
          </div>

        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY */}
        <div className="order-summary-card">
          <h2 className="summary-title">Order Summary</h2>
          
          <div className="summary-items">
            {order.items.map((item, idx) => (
              <div key={idx} className="summary-item">
                <div className="summary-item-img-wrapper">
                  <img 
                    src={Array.isArray(item.image) ? item.image[0] : item.image} 
                    alt={item.name} 
                  />
                  <span className="summary-item-qty">{item.quantity}</span>
                </div>
                <div className="summary-item-info">
                  <h4>{item.name}</h4>
                  <p>Size: {item.selectedSize}</p>
                </div>
                <div className="summary-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <hr className="summary-divider" />

          <div className="summary-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>${order.totals.subtotal.toFixed(2)}</span>
            </div>
            {order.totals.discount > 0 && (
              <div className="total-row discount-row">
                <span>Discount</span>
                <span>-${order.totals.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="total-row">
              <span>Shipping</span>
              <span>{order.totals.shipping === 0 ? 'FREE' : `$${order.totals.shipping.toFixed(2)}`}</span>
            </div>
            <div className="total-row">
              <span>Taxes</span>
              <span>${order.totals.taxes.toFixed(2)}</span>
            </div>
          </div>

          <hr className="summary-divider" />

          <div className="grand-total-row">
            <span>Total</span>
            <div>
              <span className="currency-label">CAD</span>
              ${order.totals.total.toFixed(2)}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderDetails;