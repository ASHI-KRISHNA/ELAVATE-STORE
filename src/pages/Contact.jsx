import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';


const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate an API call to send the email
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
      
      // Optional: reset success message after a few seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <div className="contact-page">
      <div className="container">
        
        <div className="contact-header">
          <h1 className="contact-title">Client Services</h1>
          <p className="contact-subtitle">
            Whether you have a question about a recent order, sizing, or our design process, our concierge team is here to assist you.
          </p>
        </div>

        <div className="contact-layout">
          
          {/* LEFT COLUMN: THE FORM */}
          <div className="contact-form-wrapper">
            {isSubmitted ? (
              <div className="contact-success-message">
                <h3>Message Received</h3>
                <p>Thank you for reaching out. A member of our client services team will respond to your inquiry within 24 hours.</p>
              </div>
            ) : null}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-input-group">
                  <label htmlFor="firstName">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    className="contact-input" 
                    value={formData.firstName}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="contact-input-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    className="contact-input" 
                    value={formData.lastName}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="contact-input-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="contact-input" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="contact-input-group">
                <label htmlFor="subject">Subject</label>
                <select 
                  id="subject" 
                  name="subject" 
                  className="contact-input"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select a topic</option>
                  <option value="Order Status">Order Status</option>
                  <option value="Returns & Exchanges">Returns & Exchanges</option>
                  <option value="Sizing Advice">Sizing Advice</option>
                  <option value="Press Inquiries">Press Inquiries</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="contact-input-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  className="contact-textarea" 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                ></textarea>
              </div>

              <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: CONTACT INFO */}
          <div className="contact-info-wrapper">
            <div className="info-block">
              <Mail className="info-icon" size={20} strokeWidth={1.5} />
              <div className="info-content">
                <h3>Email Us</h3>
                <p>For general inquiries & support:</p>
                <p><a href="mailto:support@elavate.com">support@elavate.com</a></p>
              </div>
            </div>

            <div className="info-block">
              <Phone className="info-icon" size={20} strokeWidth={1.5} />
              <div className="info-content">
                <h3>Call Us</h3>
                <p>Mon - Fri, 9am - 6pm EST</p>
                <p><a href="tel:+18001234567">+1 (800) 123-4567</a></p>
              </div>
            </div>

            <div className="info-block">
              <MapPin className="info-icon" size={20} strokeWidth={1.5} />
              <div className="info-content">
                <h3>Studio (Appointment Only)</h3>
                <p>123 King Street West<br/>Toronto, ON M5H 3T9<br/>Canada</p>
              </div>
            </div>

            <div className="contact-visual">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" 
                alt="Elavate Design Studio" 
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;