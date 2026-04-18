import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Package, MapPin, CreditCard, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Fetch all orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem('elavate_orders') || '[]');
    
    // Find the specific order that matches the URL parameter
    const foundOrder = allOrders.find(o => o.orderNumber === orderId);
    
    if (foundOrder) {
      setOrder(foundOrder);
    }
    
    setLoading(false);
  }, [orderId]);

  if (loading) {
    return (
      <div style={{ padding: '150px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ padding: '150px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2>Order Not Found</h2>
        <p style={{ color: '#666', marginTop: '10px', marginBottom: '20px' }}>
          We couldn't find the order you're looking for.
        </p>
        <button 
          onClick={() => navigate('/profile')} 
          style={{ padding: '10px 20px', background: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}
        >
          Return to Profile
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '120px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      
      <div style={{ marginBottom: '30px' }}>
        <Link to="/profile" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#555', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>
          <ChevronLeft size={16} /> Back to Profile
        </Link>
        <h1 style={{ fontSize: '2rem', marginTop: '15px', fontWeight: '600' }}>
          Order {order.orderNumber}
        </h1>
        <p style={{ color: '#666', marginTop: '5px' }}>Placed on {order.date}</p>
        <span style={{ 
            display: 'inline-block', 
            marginTop: '12px', 
            fontSize: '0.75rem', 
            padding: '4px 12px', 
            borderRadius: '20px', 
            background: order.status === 'Delivered' ? '#eefdf3' : '#fff9f0', 
            color: order.status === 'Delivered' ? '#28a745' : '#f0ad4e', 
            fontWeight: '600', 
            textTransform: 'uppercase', 
            letterSpacing: '0.5px' 
        }}>
          {order.status || 'Processing'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: ORDER INFO */}
        <div style={{ display: 'grid', gap: '20px' }}>
          
          <div style={{ padding: '24px', background: '#fff', border: '1px solid #eee', borderRadius: '8px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', marginBottom: '15px', fontWeight: '600' }}>
              <Package size={20} strokeWidth={1.5} /> Shipping Method
            </h3>
            <p style={{ color: '#555' }}>
              {order.totals.shipping === 0 ? 'Free Standard Shipping' : 'Standard Shipping'}
            </p>
          </div>

          <div style={{ padding: '24px', background: '#fff', border: '1px solid #eee', borderRadius: '8px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', marginBottom: '15px', fontWeight: '600' }}>
              <MapPin size={20} strokeWidth={1.5} /> Shipping Address
            </h3>
            <p style={{ color: '#555', lineHeight: '1.6' }}>
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
              {order.shippingAddress.address}<br />
              {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.postalCode}<br />
              {order.shippingAddress.country && <>{order.shippingAddress.country}</>}
            </p>
          </div>

          <div style={{ padding: '24px', background: '#fff', border: '1px solid #eee', borderRadius: '8px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', marginBottom: '15px', fontWeight: '600' }}>
              <CreditCard size={20} strokeWidth={1.5} /> Payment Details
            </h3>
            <p style={{ color: '#555' }}>{order.paymentMethod}</p>
          </div>

        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY */}
        <div style={{ padding: '24px', background: '#fafafa', border: '1px solid #eee', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', fontWeight: '600' }}>Order Summary</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            {order.items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '64px', height: '64px', background: '#eee', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={Array.isArray(item.image) ? item.image[0] : item.image} 
                    alt={item.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#555', color: '#fff', fontSize: '0.7rem', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '2px solid #fafafa' }}>
                    {item.quantity}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '4px' }}>{item.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#666' }}>Size: {item.selectedSize}</p>
                </div>
                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #ddd', marginBottom: '16px' }} />

          <div style={{ display: 'grid', gap: '12px', fontSize: '0.95rem', color: '#555', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal</span>
              <span>${order.totals.subtotal.toFixed(2)}</span>
            </div>
            {order.totals.discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d93025' }}>
                <span>Discount</span>
                <span>-${order.totals.discount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Shipping</span>
              <span>{order.totals.shipping === 0 ? 'FREE' : `$${order.totals.shipping.toFixed(2)}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Taxes</span>
              <span>${order.totals.taxes.toFixed(2)}</span>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #ddd', marginBottom: '16px' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.2rem', fontWeight: '700' }}>
            <span>Total</span>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#666', marginRight: '6px', fontWeight: '500' }}>CAD</span>
              ${order.totals.total.toFixed(2)}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderDetails;