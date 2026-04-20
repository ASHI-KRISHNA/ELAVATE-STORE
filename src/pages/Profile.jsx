import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, LogOut, ChevronRight, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [orders, setOrders] = useState([]);
  
  // Address states
  const [addresses, setAddresses] = useState([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  useEffect(() => {
    // Fetch orders and addresses tied to the current user's email
    if (currentUser?.email) {
      const allOrders = JSON.parse(localStorage.getItem('elavate_orders') || '[]');
      const userOrders = allOrders.filter(order => order.userEmail === currentUser.email);
      setOrders(userOrders.reverse());

      const savedAddresses = JSON.parse(localStorage.getItem(`elavate_addresses_${currentUser.email}`) || '[]');
      setAddresses(savedAddresses);
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    
    if (currentUser?.email) {
      localStorage.setItem(`elavate_addresses_${currentUser.email}`, JSON.stringify(updatedAddresses));
    }
    
    // Reset form and close
    setIsAddingAddress(false);
    setNewAddress({ street: '', city: '', state: '', zip: '', country: '' });
  };

  return (
    <div className="profile-page-container">
      <div className="profile-layout">

        {/* SIDEBAR NAVIGATION */}
        <aside className="profile-sidebar">
          <h1 className="profile-title">Account</h1>
          <nav className="profile-nav">
            <button 
              className={`profile-nav-btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')} 
            >
              <User size={18} /> Personal Details
            </button>
            <button 
              className={`profile-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')} 
            >
              <Package size={18} /> My Orders
            </button>
            <button 
              className={`profile-nav-btn ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')} 
            >
              <MapPin size={18} /> Addresses
            </button>
            <button className="profile-nav-btn logout-btn" onClick={handleLogout}>
              <LogOut size={18} /> Sign Out
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="profile-content">

          {/* TAB: PERSONAL DETAILS */}
          {activeTab === 'details' && (
            <div className="tab-pane">
              <h2 className="profile-tab-title">Personal Details</h2>
              <div className="details-grid">
                <div>
                  <label className="detail-label">Full Name</label>
                  <p className="detail-value">{currentUser?.firstName} {currentUser?.lastName}</p>
                </div>
                <div>
                  <label className="detail-label">Email Address</label>
                  <p className="detail-value">{currentUser?.email || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: MY ORDERS */}
          {activeTab === 'orders' && (
            <div className="tab-pane">
              <h2 className="profile-tab-title">Order History</h2>
              {orders.length > 0 ? (
                <div className="orders-list">
                  {orders.map((order, index) => (
                    <div
                      key={index}
                      className="order-card"
                      onClick={() => navigate(`/order/${order.orderNumber}`)}
                    >
                      <div className="order-info">
                        <span className="order-number">{order.orderNumber}</span>
                        <span className="order-date">{order.date}</span>
                      </div>
                      <div className="order-status-wrapper">
                        <span className={`status-badge ${(order.status || 'processing').toLowerCase()}`}>
                          {order.status || 'Processing'}
                        </span>
                      </div>
                      <div className="order-total-price">
                        ${order.totals.total.toFixed(2)}
                      </div>
                      <ChevronRight size={18} color="#999" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-orders">
                  <ShoppingBag size={48} strokeWidth={1} color="#ccc" className="empty-icon" />
                  <p>You haven't placed any orders yet.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="tab-pane">
              <h2 className="profile-tab-title">Saved Addresses</h2>
              
              {isAddingAddress ? (
                <form className="address-form" onSubmit={handleSaveAddress}>
                  <input required type="text" name="street" placeholder="Street Address" value={newAddress.street} onChange={handleAddressChange} className="profile-input" />
                  <input required type="text" name="city" placeholder="City" value={newAddress.city} onChange={handleAddressChange} className="profile-input" />
                  <div className="input-row">
                    <input required type="text" name="state" placeholder="State/Province" value={newAddress.state} onChange={handleAddressChange} className="profile-input" />
                    <input required type="text" name="zip" placeholder="ZIP / Postal Code" value={newAddress.zip} onChange={handleAddressChange} className="profile-input" />
                  </div>
                  <input required type="text" name="country" placeholder="Country" value={newAddress.country} onChange={handleAddressChange} className="profile-input" />
                  
                  <div className="form-actions">
                    <button type="submit" className="btn-solid">Save Address</button>
                    <button type="button" onClick={() => setIsAddingAddress(false)} className="btn-outline">Cancel</button>
                  </div>
                </form>
              ) : (
                <div>
                  {addresses.length > 0 ? (
                    <div className="addresses-list">
                      {addresses.map((addr, idx) => (
                        <div key={idx} className="address-card">
                          <p className="address-title">Address {idx + 1}</p>
                          <p className="address-details">
                            {addr.street}<br />
                            {addr.city}, {addr.state} {addr.zip}<br />
                            {addr.country}
                          </p>
                        </div>
                      ))}
                      <button onClick={() => setIsAddingAddress(true)} className="btn-outline mt-sm">
                        ADD ANOTHER ADDRESS
                      </button>
                    </div>
                  ) : (
                    <div className="order-card empty-address-card">
                      <div>
                        <p className="address-title">Default Shipping Address</p>
                        <p className="address-empty-text">
                          No address saved. Add one to speed up checkout.
                        </p>
                      </div>
                      <button onClick={() => setIsAddingAddress(true)} className="btn-outline">
                        ADD NEW
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;