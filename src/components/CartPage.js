import React from 'react';

function CartPage({ cartItems, onRemove, onCheckout }) {
  if (!cartItems || cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const total = cartItems.reduce(
    (acc, item) => acc + (item.price * item.quantity),
    0
  );

  return (
    <div className="card p-3">
      <h4>Your Cart</h4>
      <ul className="list-group mb-3">
        {cartItems.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {item.name} x {item.quantity} - ₹{(item.price * item.quantity).toFixed(2)}
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => onRemove(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div>
        <strong>Total: ₹{total.toFixed(2)}</strong>
      </div>
      <button className="btn btn-success mt-3" onClick={onCheckout}>
        Checkout
      </button>
    </div>
  );
}

export default CartPage;
