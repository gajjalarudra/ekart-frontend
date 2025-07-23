import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderHistory.css'; // 👈 create this new file

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://superkart.devopspedia.online/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="order-history-container">
      <h2 className="order-title">📜 Order History</h2>
      {orders.length === 0 ? (
        <div className="empty-order">No orders yet.</div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span className="order-id">Order #{order.id}</span>
              <span className="order-total">Total: ₹{order.total_amount}</span>
            </div>
            <ul className="order-items">
              {order.OrderItems.map((item) => (
                <li key={item.id} className="order-item">
                  <span className="item-name">{item.Product.name}</span>
                  <span className="item-qty">Qty: {item.quantity}</span>
                  <span className="item-price">₹{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
