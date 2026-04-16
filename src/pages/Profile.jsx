import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Renders the user profile dashboard.
 * Enforces route protection by monitoring the AuthContext and redirecting 
 * unauthenticated users to the login view. Displays current user details 
 * and provides a secure logout action.
 *
 * @returns {JSX.Element|null} The Profile component, or null during auth redirection.
 */
const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container" style={{ padding: '80px 0', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
        My Account
      </h1>
      
      <div style={{ backgroundColor: '#fff', padding: '40px', border: '1px solid #eaeaea', maxWidth: '600px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', textTransform: 'uppercase' }}>
          Welcome back, {currentUser.firstName}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px' }}>
          <p style={{ margin: '0', fontSize: '0.9rem', color: '#444' }}>
            <strong>Name:</strong> {currentUser.firstName} {currentUser.lastName}
          </p>
          <p style={{ margin: '0', fontSize: '0.9rem', color: '#444' }}>
            <strong>Email:</strong> {currentUser.email}
          </p>
        </div>

        <button 
          onClick={handleLogout} 
          className="btn-primary"
          style={{ width: '100%', backgroundColor: '#D93025' }}
        >
          LOG OUT
        </button>
      </div>
    </div>
  );
};

export default Profile;