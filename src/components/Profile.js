import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const storedImage = localStorage.getItem('profileImage');
  const [profileImage, setProfileImage] = useState(storedImage || null);
  const [tempImage, setTempImage] = useState(null);

  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [ordersVisible, setOrdersVisible] = useState(false);
  const [orders, setOrders] = useState([]);

  // Confirm popup state
  const [confirmPopup, setConfirmPopup] = useState({
    visible: false,
    orderId: null,
  });

  // Notification state
  const [notification, setNotification] = useState(null); // { message: '', type: 'success' | 'error' }

  useEffect(() => {
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, [storedImage]);

  useEffect(() => {
    if (user) {
      setMobile(user.mobile || '');
      setAddress(user.address || '');
    }
  }, [user]);

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.REACT_APP_API_URL || 'https://superkart.devopspedia.online'}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      setNotification({ message: 'Failed to load orders', type: 'error' });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = () => {
    if (tempImage) {
      setProfileImage(tempImage);
      localStorage.setItem('profileImage', tempImage);
      setTempImage(null);
      setNotification({ message: 'Profile photo updated', type: 'success' });
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.REACT_APP_API_URL || 'https://superkart.devopspedia.online'}/auth/update-profile`,
        { mobile, address },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(prev => ({ ...prev, mobile, address }));

      setNotification({ message: 'Profile updated successfully', type: 'success' });
      setShowUpdateForm(false);
    } catch (error) {
      setNotification({ message: 'Failed to update profile', type: 'error' });
    }
  };

  const toggleOrders = () => {
    if (!ordersVisible) {
      fetchOrders();
    }
    setOrdersVisible(!ordersVisible);
  };

  // Confirm popup handlers
  const openConfirmPopup = (orderId) => {
    setConfirmPopup({ visible: true, orderId });
  };

  const closeConfirmPopup = () => {
    setConfirmPopup({ visible: false, orderId: null });
  };

  const cancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${process.env.REACT_APP_API_URL || 'https://superkart.devopspedia.online'}/orders/${orderId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotification({ message: 'Order cancelled', type: 'success' });
      fetchOrders();
    } catch (error) {
      setNotification({ message: 'Failed to cancel order', type: 'error' });
    }
  };

  const confirmCancel = () => {
    cancelOrder(confirmPopup.orderId);
    closeConfirmPopup();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Profile Page</h2>

      {/* Notification */}
      {notification && (
        <div
          style={{
            ...styles.notification,
            ...(notification.type === 'success' ? styles.successNotif : styles.errorNotif),
          }}
        >
          {notification.message}
        </div>
      )}

      {user ? (
        <>
          <img
            src={tempImage || profileImage || 'https://via.placeholder.com/120'}
            alt="Profile"
            style={styles.profileImage}
          />
          <div style={styles.inputGroup}>
            <label htmlFor="upload" style={styles.uploadLabel}>Edit Profile Picture</label>
            <input
              id="upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.hiddenFileInput}
            />
          </div>
          {tempImage && (
            <div style={styles.buttonWrapper}>
              <button onClick={handleSaveImage} style={styles.saveBtn}>Save Photo</button>
            </div>
          )}

          <p><strong>Name:</strong> {user.name || 'Name not available'}</p>
          <p><strong>Email:</strong> {user.email || 'superkart@devopspedia.online'}</p>

          {!showUpdateForm && (
            <>
              <p><strong>Mobile:</strong> {mobile || '-'}</p>
              <p><strong>Address:</strong> {address || '-'}</p>
              <button onClick={() => setShowUpdateForm(true)} style={styles.updateProfileBtn}>Update Profile</button>
              <button onClick={toggleOrders} style={styles.ordersBtn}>
                {ordersVisible ? 'Hide Your Orders ▲' : 'Show Your Orders ▼'}
              </button>
            </>
          )}

          {showUpdateForm && (
            <div style={styles.updateForm}>
              <label style={styles.label}>Mobile Number</label>
              <input
                type="text"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                style={styles.input}
                placeholder="Enter mobile number"
              />
              <label style={styles.label}>Shipping Address</label>
              <textarea
                value={address}
                onChange={e => setAddress(e.target.value)}
                style={styles.textarea}
                placeholder="Enter shipping address"
                rows={3}
              />
              <div style={styles.buttonGroup}>
                <button onClick={handleUpdateProfile} style={styles.saveBtn}>Save</button>
                <button onClick={() => setShowUpdateForm(false)} style={styles.cancelBtn}>Cancel</button>
              </div>
            </div>
          )}

          {/* Orders Dropdown */}
          {ordersVisible && (
            <div style={styles.ordersContainer}>
              {orders.length === 0 ? (
                <p>No orders yet.</p>
              ) : (
                orders.map(order => (
                  <div key={order.id} style={styles.orderCard}>
                    <div style={styles.orderHeader}>
                      <span>Order #{order.id}</span>
                      <span>Total: ₹{order.total_amount}</span>
                      <span>Status: <span style={{ fontWeight: 'bold', color: order.status === 'processed' ? 'green' : 'orange' }}>{order.status}</span></span>
                    </div>
                    <ul style={styles.orderItems}>
                      {order.items.map(item => (
                        <li key={item.id} style={styles.orderItem}>
                          <span>{item.product.name}</span>
                          <span>Qty: {item.quantity}</span>
                          <span>₹{item.price}</span>
                        </li>
                      ))}
                    </ul>
                    {order.status !== 'processed' && (
                      <button
                        style={styles.cancelOrderBtn}
                        onClick={() => openConfirmPopup(order.id)}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Custom Confirm Popup */}
          {confirmPopup.visible && (
            <div style={styles.confirmOverlay}>
              <div style={styles.confirmBox}>
                <h3 style={{ marginBottom: '1rem' }}>Cancel Order?</h3>
                <p>Are you sure you want to cancel this order? This action cannot be undone.</p>
                <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                  <button onClick={closeConfirmPopup} style={styles.cancelBtn}>No, Keep Order</button>
                  <button onClick={confirmCancel} style={{ ...styles.saveBtn, marginLeft: '1rem' }}>Yes, Cancel</button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>You must be logged in to view this page.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: '3rem auto 4rem auto',
    padding: '2rem 2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#2d3748',
    textAlign: 'center',
    minHeight: '60vh',
    position: 'relative',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
    color: '#2b6cb0',
  },
  notification: {
    position: 'fixed',
    top: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '1rem',
    zIndex: 1600,
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
  successNotif: {
    backgroundColor: '#38a169',
    color: 'white',
  },
  errorNotif: {
    backgroundColor: '#e53e3e',
    color: 'white',
  },
  profileImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '1rem',
    border: '2px solid #3182ce',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  uploadLabel: {
    display: 'inline-block',
    backgroundColor: '#3182ce',
    color: 'white',
    padding: '0.5rem 1.2rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  hiddenFileInput: {
    display: 'none',
  },
  buttonWrapper: {
    marginBottom: '1.5rem',
  },
  saveBtn: {
    backgroundColor: '#3182ce',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.4rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
  },
  cancelBtn: {
    backgroundColor: '#e53e3e',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.4rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
  },
  updateProfileBtn: {
    marginTop: '1rem',
    backgroundColor: '#38a169',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.4rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    marginRight: '1rem',
  },
  ordersBtn: {
    marginTop: '1rem',
    backgroundColor: '#2b6cb0',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.4rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
  },
  updateForm: {
    marginTop: '1rem',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    fontWeight: '600',
    marginBottom: '0.3rem',
    marginTop: '0.7rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  textarea: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    resize: 'vertical',
  },
  buttonGroup: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  ordersContainer: {
    marginTop: '2rem',
    maxHeight: '400px',
    overflowY: 'auto',
    textAlign: 'left',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: '12px',
    padding: '1rem',
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgb(0 0 0 / 0.12)',
    padding: '1rem',
    marginBottom: '1rem',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: '600',
    marginBottom: '0.7rem',
    fontSize: '1rem',
  },
  orderItems: {
    listStyleType: 'none',
    paddingLeft: 0,
    marginBottom: '1rem',
  },
  orderItem: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #eee',
    padding: '0.4rem 0',
    fontSize: '0.9rem',
  },
  cancelOrderBtn: {
    backgroundColor: '#e53e3e',
    border: 'none',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  confirmOverlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1500,
  },
  confirmBox: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    maxWidth: '400px',
    width: '90%',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#2d3748',
  }
};

export default Profile;
