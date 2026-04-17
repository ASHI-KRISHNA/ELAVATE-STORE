import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Minus, Plus, Trash2, ShoppingBag, X } from 'lucide-react';

/**
 * Renders the Shopping Cart Page.
 * Features an elegant custom modal for unauthenticated checkout attempts.
 */
const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // State to control our custom login modal
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleImageError = (e) => {
        e.target.src = 'https://placehold.co/300x400/EBE8E3/1A1A1A?text=No+Image';
    };
    const clearCart = () => {
        setCartItems([]);
    };

    const handleProceedToCheckout = () => {
        if (currentUser && currentUser.email) {
            navigate('/checkout');
        } else {
            // Trigger the modal instead of the ugly browser alert
            setShowAuthModal(true);
        }
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="cart-page-container">
                <div className="cart-empty">
                    <ShoppingBag size={48} strokeWidth={1} style={{ marginBottom: '20px', color: '#1A1A1A' }} />
                    <h2>YOUR CART IS EMPTY</h2>
                    <p style={{ color: '#666', marginBottom: '30px' }}>Looks like you haven't added anything yet.</p>
                    <Link to="/collections/all" className="btn-primary">
                        CONTINUE SHOPPING
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page-container">
            <header className="cart-header">
                <h1>Your cart</h1>
            </header>

            <div className="cart-table-header">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span style={{ textAlign: 'right' }}>Subtotal</span>
            </div>

            <div className="cart-items-list">
                {cartItems.map((item, index) => (
                    <div key={`${item.id}-${item.selectedSize}-${index}`} className="cart-item-row">
                        <div className="cart-item-product">
                            <Link to={`/product/${item.id}`}>
                                <img
                                    src={Array.isArray(item.image) ? item.image[0] : item.image}
                                    alt={item.name}
                                    onError={handleImageError}
                                />
                            </Link>
                            <div className="cart-item-details">
                                <Link to={`/product/${item.id}`} className="item-name">
                                    {item.name.toUpperCase()}
                                </Link>
                                <span className="item-size">Size: {item.selectedSize || 'M'}</span>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                                    style={{ marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px' }}
                                >
                                    <Trash2 size={14} /> Remove
                                </button>
                            </div>
                        </div>

                        <div className="cart-item-price">
                            ${Number(item.price).toFixed(2)}
                        </div>

                        <div className="cart-item-quantity">
                            <div className="quantity-controls">
                                <button onClick={() => updateQuantity(item.id, item.selectedSize, -1)}>
                                    <Minus size={14} />
                                </button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.selectedSize, 1)}>
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="cart-item-subtotal" style={{ textAlign: 'right' }}>
                            ${(item.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>

            <footer className="cart-summary">
                <div className="cart-total-section">
                    <div className="grand-subtotal">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
                            <h2>Subtotal:</h2>
                            <h2 style={{ fontSize: '1.8rem' }}>${(cartTotal || 0).toFixed(2)} CAD</h2>
                        </div>
                        <p>Taxes and shipping calculated at checkout.</p>
                    </div>

                    <button
                        className="checkout-btn"
                        onClick={handleProceedToCheckout}
                    >
                        PROCEED TO CHECKOUT
                    </button>
                </div>
            </footer>

            {/* --- ELEGANT AUTHENTICATION MODAL --- */}
            {showAuthModal && (
                <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
                    {/* e.stopPropagation() prevents clicking the box from closing the modal */}
                    <div className="auth-modal-box" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={() => setShowAuthModal(false)}>
                            <X size={24} strokeWidth={1.5} />
                        </button>
                        <h2>Login Required</h2>
                        <p>Please log in or create an account to secure your checkout and track your order.</p>
                        <div className="auth-modal-actions">
                            <Link to="/login" className="btn-primary" style={{ width: '100%', padding: '18px' }}>
                                Log In
                            </Link>
                            <Link to="/register" className="btn-secondary dark" style={{ width: '100%', padding: '18px' }}>
                                Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;