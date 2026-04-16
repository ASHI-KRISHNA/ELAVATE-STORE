import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleIcon } from '../assets/icons/BrandIcons';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      // Tiny delay ensures AuthContext updates currentUser before we move
      setTimeout(() => {
        navigate('/'); 
      }, 100);
    } catch (err) {
      setError(err.message); 
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await loginWithGoogle();
      // Added missing navigation for Google Sign-in
      setTimeout(() => {
        navigate('/');
      }, 100);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Log In</h1>
      
      <div className="login-form-wrapper">
        <button type="button" className="social-btn" onClick={handleGoogleSignIn}>
          <span className="social-icon"><GoogleIcon /></span>
          Sign in with Google
        </button>

        <form className="login-form" onSubmit={handleSubmit}>
          
          {error && <div style={{ color: '#D93025', fontSize: '0.85rem', marginBottom: '10px', textAlign: 'center', fontWeight: '600' }}>{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Link to="/forgot-password" className="forgot-link">Forgot?</Link>
            </div>
          </div>

          <div className="login-actions">
            <button type="submit" className="btn-primary sign-in-btn">SIGN IN</button>
            <Link to="/register" className="create-account-link">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;