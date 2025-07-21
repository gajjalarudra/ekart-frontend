import React, { useState } from 'react';
import axios from 'axios';
import './OrderProduct.css'; // <-- new CSS file for modal styles

function OrderProduct({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState('');

  const getToken = () => localStorage.getItem('token');

  const handleOrder = async () => {
    try {
      const token = getToken();
      if (!token) {
        alert('Please login to place an order');
        return;
      }

      await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://43.204.142.97:3001'}/orders`,
        {
          items: [{ product_id: product.id, quantity: Number(quantity) }],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStatus('✅ Order placed successfully!');
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      console.error('Order failed:', err.response?.data || err.message);
      setStatus('❌ Failed to place order');
    }
  };

  return (
    <div className="order-modal-overlay">
      <div className="order-modal">
        <h4 className="mb-3">🛒 Confirm Order</h4>
        <p><strong>Product:</strong> {product.name}</p>
        <p><strong>Price:</strong> ₹{product.price}</p>

        <div className="mb-3">
          <label>Quantity:</label>
          <input
            type="number"
            className="form-control"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />
        </div>

        {status && (
          <div className={`alert ${status.includes('Failed') ? 'alert-danger' : 'alert-success'}`}>
            {status}
          </div>
        )}

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-success" onClick={handleOrder}>Confirm Order</button>
        </div>
      </div>
    </div>
  );
}

export default OrderProduct;
