import React from 'react';
import PromoMarquee from '../components/home/PromoMarquee';

/**
 * Renders the password reset request page.
 * Provides a form for users to submit their email address to receive 
 * a password recovery link, along with navigation back to the login view.
 *
 * @returns {JSX.Element} The ForgotPassword component.
 */
const ForgotPassword = () => {
  return (
    <div className="forgot-password-page">
      <PromoMarquee />

      <div className="reset-container">
        <h2 className="reset-title">Reset your password</h2>
        <p className="reset-subtitle">We will send you an email to reset your password.</p>

        <form className="reset-form">
          <div className="form-group">
            <label htmlFor="reset-email">Email</label>
            <input type="email" id="reset-email" name="email" required />
          </div>

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