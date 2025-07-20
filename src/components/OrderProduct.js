import React, { useState } from 'react';
import axios from 'axios';

function OrderProduct({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);

  // Get token from localStorage
  const getToken = () => localStorage.getItem('token');

  const handleOrder = async () => {
    try {
      const token = getToken();

      // If no token, alert and exit
      if (!token) {
        alert('Please login to place an order');
        return;
      }

      await axios.post(
        'http://43.204.142.97:3001/orders',
        {
          items: [
            {
              product_id: product.id,
              quantity: Number(quantity),
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Order placed!');
      onClose();
    } catch (err) {
      console.error('Order failed:', err.response?.data || err.message);
      alert('Failed to place order');
    }
  };

  return (
    <div className="card p-3 my-3">
      <h4>Order: {product.name}</h4>
      <input
        type="number"
        className="form-control my-2"
        value={quantity}
        min="1"
        max={product.stock}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleOrder}>
        Confirm Order
      </button>
      <button className="btn btn-secondary ms-2" onClick={onClose}>
        Cancel
      </button>
    </div>
  );
}

export default OrderProduct;
