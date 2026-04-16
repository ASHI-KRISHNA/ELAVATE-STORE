import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  // Local State for the form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear old errors

    try {
      register(formData.firstName, formData.lastName, formData.email, formData.password);
      navigate('/'); // If successful, route them to the home page!
    } catch (err) {
      setError(err.message); // Show the error if email already exists
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Create Account</h1>
      
      <form className="register-form" onSubmit={handleSubmit}>
        
        {/* Error Display */}
        {error && <div style={{ color: '#D93025', fontSize: '0.85rem', marginBottom: '10px', textAlign: 'center', fontWeight: '600' }}>{error}</div>}

        <div className="name-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required minLength="6" />
        </div>

        <div className="checkbox-group">
          <input type="checkbox" id="newsletter" />
          <label htmlFor="newsletter">Sign up to our mailing list to get 15% off your first order.</label>
        </div>

        <div className="register-actions">
          <button type="submit" className="btn-primary register-btn">CREATE ACCOUNT</button>
          <Link to="/login" className="return-login-link">Already have an account? Log in</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;