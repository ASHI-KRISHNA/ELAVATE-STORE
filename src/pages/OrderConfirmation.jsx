import React, { useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { CheckCircle, Package, MapPin, CreditCard, ArrowRight } from 'lucide-react';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const order = state?.order;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Safety redirect if accessed without order data
  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="order-confirmation-page">
      <div className="order-conf-container">
        
        <div className="order-success-header">
          <CheckCircle size={48} strokeWidth={1} className="success-icon" />
          <h1>Thank you for your order</h1>
          <p className="order-email-notice">
            We've sent a confirmation email to <strong>{order.shippingAddress.email}</strong> with your receipt.
          </p>
        </div>

        <div className="order-details-grid">
          <div className="order-details-main">
            <div className="order-meta-box">
              <div className="meta-item">
                <span className="meta-label">Order Number</span>
                <span className="meta-value">{order.orderNumber}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Date</span>
                <span className="meta-value">{order.date}</span>
              </div>
            </div>

            <div className="order-info-sections">
              <div className="info-section">
                <h3><Package size={18} strokeWidth={1.5} /> Shipping Method</h3>
                <p>{order.totals.shipping === 0 ? 'Free Standard Shipping' : 'Standard Shipping'}</p>
              </div>

              <div className="info-section">
                <h3><MapPin size={18} strokeWidth={1.5} /> Shipping Address</h3>
                <p>
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                  {order.shippingAddress.address}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.postalCode}<br />
                  {order.shippingAddress.country}
                </p>
              </div>

              <div className="info-section">
                <h3><CreditCard size={18} strokeWidth={1.5} /> Payment Details</h3>
                <p>{order.paymentMethod}</p>
              </div>
            </div>
          </div>

          <div className="order-summary-sidebar">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-items-list">
              {order.items.map((item, idx) => (
                <div key={idx} className="conf-item">
                  <div className="conf-item-img">
                    <img src={Array.isArray(item.image) ? item.image[0] : item.image} alt={item.name} />
                    <span className="conf-item-qty">{item.quantity}</span>
                  </div>
                  <div className="conf-item-info">
                    <h4>{item.name}</h4>
                    <p>Size: {item.selectedSize}</p>
                    <span className="conf-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="conf-pricing-breakdown">
              <div className="pricing-row"><span>Subtotal</span><span>${order.totals.subtotal.toFixed(2)}</span></div>
              {order.totals.discount > 0 && <div className="pricing-row" style={{ color: '#D93025' }}><span>Discount</span><span>-${order.totals.discount.toFixed(2)}</span></div>}
              <div className="pricing-row"><span>Shipping</span><span>{order.totals.shipping === 0 ? 'FREE' : `$${order.totals.shipping.toFixed(2)}`}</span></div>
              <div className="pricing-row"><span>Taxes</span><span>${order.totals.taxes.toFixed(2)}</span></div>
            </div>

            <div className="conf-total-row">
              <span>Total</span>
              <div className="total-price">
                <span className="currency">CAD</span>
                <strong>${order.totals.total.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="order-conf-actions">
          <Link to="/collections/all" className="btn-primary" style={{ padding: '20px 40px' }}>CONTINUE SHOPPING</Link>
          <Link to="/" className="return-home-link">Return to Home <ArrowRight size={14} /></Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;