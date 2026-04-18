import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, LogOut, ChevronRight, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders tied to the current user's email
    if (currentUser?.email) {
      const allOrders = JSON.parse(localStorage.getItem('elavate_orders') || '[]');
      const userOrders = allOrders.filter(order => order.userEmail === currentUser.email);

      // Sort orders by newest first (assuming ID or Date creation)
      setOrders(userOrders.reverse());
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
                <button className="btn-secondary" style={{ width: 'fit-content', padding: '12px 24px', fontSize: '0.85rem', marginTop: '10px' }}>
                  EDIT PROFILE
                </button>
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
                      onClick={() => navigate(`/order/${order.orderNumber}`)} // <-- Added Navigation
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
              <div style={orderCardStyle}>
                <div>
                  <p style={{ fontWeight: '600' }}>Default Shipping Address</p>
                  <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '4px' }}>
                    No address saved. Add one to speed up checkout.
                  </p>
                </div>
                <button className="btn-secondary" style={{ padding: '8px 16px' }}>ADD NEW</button>
              </div>
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

export default Profile;