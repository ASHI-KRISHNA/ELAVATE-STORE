import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = () => {
      const existingOrders = JSON.parse(localStorage.getItem('elavate_orders') || '[]');
      const foundOrder = existingOrders.find(o => o.orderNumber === orderId);
      
      // Basic security check: ensure the order belongs to the logged-in user
      if (foundOrder && foundOrder.userEmail === currentUser?.email) {
        setOrder(foundOrder);
      }
      setLoading(false);
    };

    if (currentUser) {
      fetchOrder();
    } else {
      // If not logged in, they shouldn't see order details
      navigate('/login');
    }
  }, [orderId, currentUser, navigate]);

  if (loading) return <div style={{ padding: '120px 20px', textAlign: 'center' }}>Loading...</div>;

  if (!order) {
    return (
      <div style={{ padding: '120px 20px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h2>Order Not Found</h2>
        <p style={{ color: '#666', marginTop: '10px', marginBottom: '20px' }}>We couldn't find the details for this order.</p>
        <Link to="/profile" className="btn-secondary" style={{ padding: '10px 20px', textDecoration: 'none' }}>Return to Profile</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '120px auto', padding: '0 20px' }}>
      <Link to="/profile" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#666', textDecoration: 'none', marginBottom: '30px' }}>
        <ChevronLeft size={16} /> Back to Profile
      </Link>

      <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', border: '1px solid #eee' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #eee', paddingBottom: '24px', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '8px' }}>Order {order.orderNumber}</h1>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Placed on {order.date}</p>
          </div>
          <span style={{ fontSize: '0.8rem', padding: '6px 16px', borderRadius: '20px', background: order.status === 'Delivered' ? '#eefdf3' : '#fff9f0', color: order.status === 'Delivered' ? '#28a745' : '#f0ad4e', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {order.status || 'Processing'}
          </span>
        </div>

        <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', fontWeight: '500' }}>Items</h3>
        <div style={{ display: 'grid', gap: '16px', marginBottom: '40px' }}>
          {order.items.map((item, index) => (
            <div key={index} style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '16px', background: '#f9f9f9', borderRadius: '8px' }}>
              <img src={Array.isArray(item.image) ? item.image[0] : item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>{item.name}</h4>
                {item.selectedSize && <p style={{ fontSize: '0.85rem', color: '#666' }}>Size: {item.selectedSize}</p>}
                <p style={{ fontSize: '0.85rem', color: '#666' }}>Qty: {item.quantity}</p>
              </div>
              <div style={{ fontWeight: '600' }}>
                ${(Number(item.price) * (item.quantity || 1)).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', fontWeight: '500' }}>Shipping Details</h3>
            <div style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.province || ''} {order.shippingAddress.postalCode}</p>
            </div>
          </div>
          
          <div style={{ background: '#f9f9f9', padding: '24px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', fontWeight: '500' }}>Order Summary</h3>
            <div style={{ display: 'grid', gap: '12px', fontSize: '0.9rem', color: '#666' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span><span>${order.totals.subtotal.toFixed(2)}</span>
              </div>
              {order.totals.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#D93025' }}>
                  <span>Discount</span><span>-${order.totals.discount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shipping</span><span>{order.totals.shipping === 0 ? 'FREE' : `$${order.totals.shipping.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Taxes</span><span>${order.totals.taxes.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #ddd', paddingTop: '12px', marginTop: '4px', fontWeight: '600', color: '#111', fontSize: '1rem' }}>
                <span>Total</span><span>${order.totals.total.toFixed(2)} CAD</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;