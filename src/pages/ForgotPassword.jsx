import React from 'react';
import PromoMarquee from '../components/home/PromoMarquee';

/**
 * ForgotPassword Component
 * Provides a user interface for requesting a password reset link 
 * via a registered email address.
 */
const ForgotPassword = () => {
  return (
    <div className="forgot-password-page">
      <PromoMarquee />

      <div className="reset-container">
        <h2 className="reset-title">Reset your password</h2>
        <p className="reset-subtitle">We will send you an email to reset your password.</p>

        <form className="reset-form">
          {/* Email capture for identity verification */}
          <div className="form-group">
            <label htmlFor="reset-email">Email</label>
            <input type="email" id="reset-email" name="email" required />
          </div>

          {/* Form submission and navigation back to authentication entry */}
          <div className="reset-actions">
            <button type="submit" className="btn-primary reset-btn">
              SUBMIT
            </button>
            <a href="/login" className="cancel-link">
              Cancel
            </a>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ForgotPassword;