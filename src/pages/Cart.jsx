import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, X, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/300x400?text=Elavate';
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty">
                <h2>YOUR CART IS EMPTY</h2>
                <Link title="Shop Now" to="/collections/all" className="btn-primary">CONTINUE SHOPPING</Link>
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
                <span>Subtotal</span>
            </div>

            <div className="cart-items-list">
                {cartItems.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="cart-item-row">
                        <div className="cart-item-product">
                            <img 
                                src={Array.isArray(item.image) ? item.image[0] : item.image} 
                                alt={item.name} 
                                onError={handleImageError}
                            />
                            <div className="cart-item-details">
                                <span className="item-name">{item.name.toUpperCase()}</span>
                                <span className="item-size">Size: {item.selectedSize}</span>
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
                            <button className="remove-btn" onClick={() => removeFromCart(item.id, item.selectedSize)}>
                                Remove
                            </button>
                        </div>

                        <div className="cart-item-subtotal">
                            ${(item.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>

            <footer className="cart-summary">
                <div className="cart-total-section">
                    <div className="promo-applied">
                        <Tag size={16} />
                        <span>ELAVATE20</span>
                        <span className="discount-amt">-$20.00</span>
                    </div>
                    <div className="grand-subtotal">
                        <h2>Subtotal: ${cartTotal.toFixed(2)} CAD</h2>
                        <p>Taxes, discounts and shipping calculated at checkout.</p>
                    </div>
                    <button className="checkout-btn">CHECKOUT</button>
                </div>
            </footer>
        </div>
    );
};

export default Cart;