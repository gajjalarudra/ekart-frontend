import React from 'react';
import { Link } from 'react-router-dom';

function CartPage({ cartItems, onRemove, onCheckout }) {
  if (!cartItems || cartItems.length === 0) {
    return (
      <div style={styles.emptyCart}>
        <h4>Your cart is empty.</h4>
        <p>
          Explore our products and add items to your cart.{' '}
          <Link to="/shop" style={styles.shopLink}>Shop now</Link>
        </p>
      </div>
    );
  }

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  return (
    <div style={styles.cartCard}>
      <h3 style={styles.title}>Items in your Cart</h3>
      <ul style={styles.itemList}>
        {cartItems.map((item) => (
          <li key={item.id} style={styles.item}>
            <div>
              <strong>{item.name}</strong> × {item.quantity}
              <div style={styles.price}>₹{Number(item.price).toFixed(2)} each</div>
            </div>
            <button style={styles.removeBtn} onClick={() => onRemove(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div style={styles.total}>
        <strong>Total Cart Value:</strong> ₹{total.toFixed(2)}
      </div>
      <button style={styles.checkoutBtn} onClick={onCheckout}>
        ✅ Proceed to Checkout
      </button>
    </div>
  );
}

const styles = {
  cartCard: {
    background: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '12px',
    padding: '2rem',
    maxWidth: '600px',
    margin: '2rem auto',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
    backdropFilter: 'blur(10px)',
  },
  emptyCart: {
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    padding: '2rem',
    textAlign: 'center',
    margin: '2rem auto',
    maxWidth: '500px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontSize: '1.8rem',
    color: '#2D3748',
  },
  itemList: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '1.5rem',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    backgroundColor: '#F7FAFC',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  price: {
    fontSize: '0.85rem',
    color: '#718096',
    marginTop: '4px',
  },
  removeBtn: {
    backgroundColor: '#E53E3E',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  total: {
    fontSize: '1.1rem',
    textAlign: 'right',
    marginBottom: '1.2rem',
    fontWeight: '600',
  },
  checkoutBtn: {
    backgroundColor: '#38A169',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    width: '100%',
    fontSize: '1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s',
  },
  shopLink: {
  color: '#3182ce',
  textDecoration: 'underline',
  fontWeight: '600',
  cursor: 'pointer',
  },
};

export default CartPage;
