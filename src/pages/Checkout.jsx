import React from 'react';
import { ShoppingBag, Search, HelpCircle, Tag, ChevronDown } from 'lucide-react';

const Checkout = () => {
  return (
    <div className="checkout-layout">
      
      {/* LEFT COLUMN: The Form */}
      <div className="checkout-main">
        <header className="checkout-header">
          <a href="/" className="checkout-logo">ELAVATE</a>
          <ShoppingBag size={24} strokeWidth={1.5} />
        </header>

        <div className="express-checkout">
          <p>Express checkout</p>
          <div className="express-buttons">
            <button className="btn-express shop-pay">Shop Pay</button>
            <button className="btn-express paypal">PayPal</button>
          </div>
          <div className="divider"><span>OR</span></div>
        </div>

        <form className="checkout-form">
          {/* Contact Section */}
          <section className="form-section">
            <div className="section-header-row">
              <h2>Contact</h2>
              <a href="/login" className="sign-in-link">Sign in</a>
            </div>
            <input type="email" placeholder="Email" required className="checkout-input" />
          </section>

          {/* Delivery Section */}
          <section className="form-section">
            <h2>Delivery</h2>
            
            <div className="input-group">
              <div className="select-wrapper">
                <select className="checkout-input" defaultValue="Canada">
                  <option value="Canada">Canada</option>
                  <option value="US">United States</option>
                </select>
                <ChevronDown className="select-icon" size={16} />
              </div>
            </div>

            <div className="input-row">
              <input type="text" placeholder="First name" className="checkout-input half" />
              <input type="text" placeholder="Last name" className="checkout-input half" />
            </div>

            <input type="text" placeholder="Company (optional)" className="checkout-input" />

            <div className="input-icon-wrapper">
              <input type="text" placeholder="Address" className="checkout-input" />
              <Search className="input-icon" size={18} />
            </div>

            <input type="text" placeholder="Apartment, suite, etc. (optional)" className="checkout-input" />

            <div className="input-row three-col">
              <input type="text" placeholder="City" className="checkout-input" />
              <div className="select-wrapper">
                <select className="checkout-input" defaultValue="Province">
                  <option disabled>Province</option>
                  <option value="ON">Ontario</option>
                  <option value="QC">Quebec</option>
                  <option value="BC">British Columbia</option>
                </select>
                <ChevronDown className="select-icon" size={16} />
              </div>
              <input type="text" placeholder="Postal code" className="checkout-input" />
            </div>

            <div className="input-icon-wrapper">
              <input type="tel" placeholder="Phone" className="checkout-input" />
              <HelpCircle className="input-icon text-muted" size={18} />
            </div>
          </section>

          {/* Shipping Method */}
          <section className="form-section">
            <h2>Shipping method</h2>
            <div className="shipping-placeholder">
              Enter your shipping address to view available shipping methods.
            </div>
          </section>

          {/* Payment */}
          <section className="form-section">
            <h2>Payment</h2>
            <p className="subtitle">All transactions are secure and encrypted.</p>
            
            <div className="payment-box">
              <div className="payment-header">
                <span>Credit card</span>
              </div>
              <div className="payment-body">
                <input type="text" placeholder="Card number" className="checkout-input" />
                <div className="input-row">
                  <input type="text" placeholder="Expiration date (MM / YY)" className="checkout-input half" />
                  <input type="text" placeholder="Security code" className="checkout-input half" />
                </div>
                <input type="text" placeholder="Name on card" className="checkout-input" />
              </div>
            </div>

            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <span>Use shipping address as billing address</span>
            </label>
          </section>

          {/* Submit */}
          <button type="submit" className="btn-pay-now">Pay now</button>
        </form>

        <footer className="checkout-footer">
          <a href="#">Refund policy</a>
          <a href="#">Shipping</a>
          <a href="#">Privacy policy</a>
          <a href="#">Terms of service</a>
        </footer>
      </div>

      {/* RIGHT COLUMN: Order Summary */}
      <div className="checkout-sidebar">
        <div className="sidebar-content">
          
          {/* Product Row */}
          <div className="summary-product">
            <div className="product-image-container">
              <img src="https://res.cloudinary.com/dd0jdnlj4/image/upload/v1775922502/Organic_Cotton_Oxford_Shirt_A_wqejbq.png" alt="Jasper Shirt" />
              <span className="item-quantity">1</span>
            </div>
            <div className="product-details">
              <h3>JASPER SHIRT - LONG SLEEVE</h3>
              <p className="size">M</p>
              <div className="discount-tag">
                <Tag size={12} /> BACK20 (-$15.00)
              </div>
            </div>
            <div className="product-pricing">
              <span className="original-price">$75.00</span>
              <span className="final-price">$60.00</span>
            </div>
          </div>

          {/* Discount Code */}
          <div className="discount-section">
            <input type="text" placeholder="Discount code or gift card" className="checkout-input" />
            <button className="btn-apply">Apply</button>
          </div>

          {/* Pricing Math */}
          <div className="pricing-breakdown">
            <div className="pricing-row">
              <span>Subtotal</span>
              <span>$60.00</span>
            </div>
            <div className="pricing-row">
              <span>Shipping</span>
              <span className="placeholder-dash">--</span>
            </div>
            <div className="pricing-row">
              <span className="flex-align">Estimated taxes <HelpCircle size={14} className="text-muted" /></span>
              <span className="placeholder-dash">--</span>
            </div>
          </div>

          {/* Total */}
          <div className="checkout-total">
            <span>Total</span>
            <div className="total-price">
              <span className="currency">CAD</span>
              <strong>$63.00</strong>
            </div>
          </div>
          
          <div className="total-savings">
            <Tag size={14} /> TOTAL SAVINGS $15.00
          </div>

        </div>
      </div>

    </div>
  );
};

export default Checkout;