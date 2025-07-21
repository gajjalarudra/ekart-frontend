import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://superkart.devopspedia.online/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="card p-4">
      <h4>📜 Order History</h4>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="border rounded p-3 mb-3">
            <strong>Order ID: {order.id}</strong> <br />
            <small>Total: ₹{order.total_amount}</small> <br />
            <ul className="mt-2">
              {order.OrderItems.map(item => (
                <li key={item.id}>
                  {item.Product.name} - Qty: {item.quantity} - ₹{item.price}
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
