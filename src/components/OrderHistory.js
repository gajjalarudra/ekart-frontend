import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [processingOrderId, setProcessingOrderId] = useState(null);
  const [message, setMessage] = useState('');

  // Clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000); // 3 seconds
      return () => clearTimeout(timer); // Cleanup on unmount or message change
    }
  }, [message]);

  // ... rest of your code unchanged

  // Fetch orders excluding processed ones
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://superkart.devopspedia.online/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const activeOrders = res.data.filter(order => order.status !== 'processed');
      setOrders(activeOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const processOrder = async (orderId) => {
    setProcessingOrderId(orderId);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `https://superkart.devopspedia.online/orders/${orderId}/process`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(`✅ Order #${orderId} processed successfully!`);
      fetchOrders();
    } catch (error) {
      console.error('Error processing order:', error);
      setMessage('❌ Failed to process order. Try again.');
    } finally {
      setProcessingOrderId(null);
    }
  };

  return (
    <div className="order-history-container">
      <h2 className="order-title">
        <span className="order-title-icon" role="img" aria-label="history">
          🛒📜
        </span>
        Order History
      </h2>

      {message && <div className="message">{message}</div>}

      {orders.length === 0 ? (
        <div className="empty-order">No active orders yet.</div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span className="order-id">Order #{order.id}</span>
              <span className="order-total">Total: ₹{order.total_amount}</span>
              <span className={`order-status ${order.status}`}>
                {order.status.toUpperCase()}
              </span>
            </div>

            <ul className="order-items">
              {order.items?.map((item) => (
                <li key={item.id} className="order-item">
                  <span className="item-name">{item.product?.name || 'Product Deleted'}</span>
                  <span className="item-qty">Qty: {item.quantity}</span>
                  <span className="item-price">₹{item.price}</span>
                </li>
              ))}
            </ul>

            <button
              className="process-btn"
              disabled={processingOrderId === order.id}
              onClick={() => processOrder(order.id)}
            >
              {processingOrderId === order.id ? 'Processing...' : 'Process'}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
