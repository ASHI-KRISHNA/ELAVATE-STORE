import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, MapPin, CreditCard, ArrowRight } from 'lucide-react';

/**
 * Renders the Order Success / Details Page.
 * Displays a high-end, minimalist confirmation screen with order summary.
 */
const OrderConfirmation = () => {
  const navigate = useNavigate();
  
  // Mock order data (In a real app, you'd pass this via navigation state or context)
  const orderNumber = "ELV-" + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="order-confirmation-page">
      <div className="order-conf-container">
        
        {/* Success Header */}
        <div className="order-success-header">
          <CheckCircle size={48} strokeWidth={1} className="success-icon" />
          <h1>Thank you for your order</h1>
          <p className="order-email-notice">
            We've sent a confirmation email to <strong>customer@example.com</strong> with your order details and receipt.
          </p>
        </div>

        {/* Order Details Grid */}
        <div className="order-details-grid">
          
          {/* Left Column: Details */}
          <div className="order-details-main">
            <div className="order-meta-box">
              <div className="meta-item">
                <span className="meta-label">Order Number</span>
                <span className="meta-value">{orderNumber}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Date</span>
                <span className="meta-value">{orderDate}</span>
              </div>
            </div>

            <div className="order-info-sections">
              <div className="info-section">
                <h3><Package size={18} strokeWidth={1.5} /> Shipping Method</h3>
                <p>Standard Shipping (3-5 Business Days)</p>
              </div>

              <div className="info-section">
                <h3><MapPin size={18} strokeWidth={1.5} /> Shipping Address</h3>
                <p>
                  Jane Doe<br />
                  123 Editorial Avenue<br />
                  Suite 4B<br />
                  Toronto, ON M5V 2T6<br />
                  Canada
                </p>
              </div>

              <div className="info-section">
                <h3><CreditCard size={18} strokeWidth={1.5} /> Payment Details</h3>
                <p>Visa ending in •••• 4242</p>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="order-summary-sidebar">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="summary-items-list">
              {/* Mock Item 1 */}
              <div className="conf-item">
                <div className="conf-item-img">
                  <img src="https://placehold.co/120x150/EBE8E3/1A1A1A?text=Product" alt="Item" />
                  <span className="conf-item-qty">1</span>
                </div>
                <div className="conf-item-info">
                  <h4>THE OVERSIZED BLAZER</h4>
                  <p>Size: M</p>
                  <span className="conf-item-price">$185.00</span>
                </div>
              </div>

               {/* Mock Item 2 */}
               <div className="conf-item">
                <div className="conf-item-img">
                  <img src="https://placehold.co/120x150/EBE8E3/1A1A1A?text=Product" alt="Item" />
                  <span className="conf-item-qty">2</span>
                </div>
                <div className="conf-item-info">
                  <h4>TAILORED TROUSER</h4>
                  <p>Size: 32</p>
                  <span className="conf-item-price">$240.00</span>
                </div>
              </div>
            </div>

            <div className="conf-pricing-breakdown">
              <div className="pricing-row">
                <span>Subtotal</span>
                <span>$425.00</span>
              </div>
              <div className="pricing-row">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="pricing-row">
                <span>Taxes (HST)</span>
                <span>$55.25</span>
              </div>
            </div>

            <div className="conf-total-row">
              <span>Total</span>
              <div className="total-price">
                <span className="currency">CAD</span>
                <strong>$480.25</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="order-conf-actions">
          <Link to="/collections/all" className="btn-primary" style={{ padding: '20px 40px' }}>
            CONTINUE SHOPPING
          </Link>
          <Link to="/" className="return-home-link">
            Return to Home <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderConfirmation;