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
    <div className="profile-page-container" style={{ maxWidth: '1200px', margin: '120px auto', padding: '0 20px' }}>
      <div className="profile-layout" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '40px' }}>

        {/* SIDEBAR NAVIGATION */}
        <aside className="profile-sidebar">
          <h1 style={{ fontSize: '1.5rem', marginBottom: '30px', fontWeight: '600', letterSpacing: '-0.5px' }}>Account</h1>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button onClick={() => setActiveTab('details')} style={navButtonStyle(activeTab === 'details')}>
              <User size={18} /> Personal Details
            </button>
            <button onClick={() => setActiveTab('orders')} style={navButtonStyle(activeTab === 'orders')}>
              <Package size={18} /> My Orders
            </button>
            <button onClick={() => setActiveTab('addresses')} style={navButtonStyle(activeTab === 'addresses')}>
              <MapPin size={18} /> Addresses
            </button>
            <button onClick={handleLogout} style={{ ...navButtonStyle(false), color: '#d93025', marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
              <LogOut size={18} /> Sign Out
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="profile-content" style={{ background: '#fff', padding: '40px', borderRadius: '12px', border: '1px solid #eee' }}>

          {/* TAB: PERSONAL DETAILS */}
          {activeTab === 'details' && (
            <div className="tab-pane">
              <h2 style={{ fontSize: '1.2rem', marginBottom: '25px', fontWeight: '500' }}>Personal Details</h2>
              <div className="details-grid" style={{ display: 'grid', gap: '24px' }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <p style={valueStyle}>{currentUser?.firstName} {currentUser?.lastName}</p>
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <p style={valueStyle}>{currentUser?.email || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: MY ORDERS */}
          {activeTab === 'orders' && (
            <div className="tab-pane">
              <h2 style={{ fontSize: '1.2rem', marginBottom: '25px', fontWeight: '500' }}>Order History</h2>
              {orders.length > 0 ? (
                <div className="orders-list" style={{ display: 'grid', gap: '16px' }}>
                  {orders.map((order, index) => (
                    <div
                      key={index}
                      style={orderCardStyle}
                      onClick={() => navigate(`/order/${order.orderNumber}`)}
                    >
                      <div className="order-info">
                        <span style={{ fontWeight: '600', display: 'block', fontSize: '0.95rem' }}>{order.orderNumber}</span>
                        <span style={{ fontSize: '0.8rem', color: '#888' }}>{order.date}</span>
                      </div>
                      <div className="order-status">
                        <span style={statusBadgeStyle(order.status || 'Processing')}>{order.status || 'Processing'}</span>
                      </div>
                      <div className="order-total" style={{ fontWeight: '600' }}>
                        ${order.totals.total.toFixed(2)}
                      </div>
                      <ChevronRight size={18} color="#999" />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '80px 0' }}>
                  <ShoppingBag size={48} strokeWidth={1} color="#ccc" style={{ marginBottom: '16px' }} />
                  <p style={{ color: '#888' }}>You haven't placed any orders yet.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="tab-pane">
              <h2 style={{ fontSize: '1.2rem', marginBottom: '25px', fontWeight: '500' }}>Saved Addresses</h2>
              
              {isAddingAddress ? (
                <form onSubmit={handleSaveAddress} style={{ display: 'grid', gap: '16px', maxWidth: '500px' }}>
                  <input required type="text" name="street" placeholder="Street Address" value={newAddress.street} onChange={handleAddressChange} style={inputStyle} />
                  <input required type="text" name="city" placeholder="City" value={newAddress.city} onChange={handleAddressChange} style={inputStyle} />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input required type="text" name="state" placeholder="State/Province" value={newAddress.state} onChange={handleAddressChange} style={inputStyle} />
                    <input required type="text" name="zip" placeholder="ZIP / Postal Code" value={newAddress.zip} onChange={handleAddressChange} style={inputStyle} />
                  </div>
                  <input required type="text" name="country" placeholder="Country" value={newAddress.country} onChange={handleAddressChange} style={inputStyle} />
                  
                  <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                    <button type="submit" style={{ padding: '10px 20px', background: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>
                      Save Address
                    </button>
                    <button type="button" onClick={() => setIsAddingAddress(false)} style={{ padding: '10px 20px', background: '#f5f5f5', color: '#333', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  {addresses.length > 0 ? (
                    <div style={{ display: 'grid', gap: '16px' }}>
                      {addresses.map((addr, idx) => (
                        <div key={idx} style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', background: '#fafafa' }}>
                          <p style={{ fontWeight: '600', marginBottom: '8px' }}>Address {idx + 1}</p>
                          <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.5' }}>
                            {addr.street}<br />
                            {addr.city}, {addr.state} {addr.zip}<br />
                            {addr.country}
                          </p>
                        </div>
                      ))}
                      <button onClick={() => setIsAddingAddress(true)} style={{ marginTop: '10px', padding: '10px 20px', width: 'fit-content', background: '#fff', border: '1px solid #000', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
                        ADD ANOTHER ADDRESS
                      </button>
                    </div>
                  ) : (
                    <div style={orderCardStyle}>
                      <div>
                        <p style={{ fontWeight: '600' }}>Default Shipping Address</p>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '4px' }}>
                          No address saved. Add one to speed up checkout.
                        </p>
                      </div>
                      <button onClick={() => setIsAddingAddress(true)} style={{ padding: '8px 16px', background: '#fff', border: '1px solid #000', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
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

// --- STYLING HELPERS ---
const navButtonStyle = (isActive) => ({
  display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', border: 'none', background: isActive ? '#f7f7f7' : 'transparent', color: isActive ? '#000' : '#888', fontWeight: isActive ? '600' : '400', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s ease', fontSize: '0.9rem', width: '100%'
});
const labelStyle = { display: 'block', fontSize: '0.75rem', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' };
const valueStyle = { fontSize: '1rem', fontWeight: '400', color: '#111' };
const orderCardStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', border: '1px solid #f0f0f0', borderRadius: '8px', cursor: 'pointer', transition: 'border-color 0.2s ease' };
const statusBadgeStyle = (status) => ({ fontSize: '0.7rem', padding: '4px 12px', borderRadius: '20px', background: status === 'Delivered' ? '#eefdf3' : '#fff9f0', color: status === 'Delivered' ? '#28a745' : '#f0ad4e', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' });
const inputStyle = { padding: '12px', borderRadius: '4px', border: '1px solid #ddd', width: '100%', fontSize: '0.95rem', outline: 'none' };

export default Profile;