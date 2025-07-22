import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Navbar.css'; // Optional if you want to move styles to CSS

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      {/* Left Side */}
      <div style={styles.left}>
        <Link to="/products" style={styles.logo}>
          <i className="fas fa-shopping-cart me-2"></i> SuperKart
        </Link>
        <Link to="/blog" style={styles.link}>
          <i className="fas fa-blog me-1"></i> Blog
        </Link>
        <Link to="/about" style={styles.link}>
          <i className="fas fa-info-circle me-1"></i> About
        </Link>
        
      </div>

      {/* Right Side */}
      <div style={styles.right}>
        {user ? (
          <>
            <Link to="/profile" style={styles.link}>
              <i className="fas fa-user me-1"></i> Profile
            </Link>
            <Link to="/cart" style={styles.link}>
              <i className="fas fa-shopping-cart me-1"></i> Cart ({cartItems?.length || 0})
            </Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              <i className="fas fa-sign-out-alt me-1"></i> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              <i className="fas fa-sign-in-alt me-1"></i> Login
            </Link>
            <Link to="/signup" style={styles.link}>
              <i className="fas fa-user-plus me-1"></i> Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    width: '100%',
    height: '60px',
    backgroundColor: '#1A202C',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem',
    color: '#fff',
    position: 'fixed',
    top: 0,
    zIndex: 1000,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.6rem',
    color: '#38B2AC',
    textDecoration: 'none',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    fontWeight: '500',
    fontSize: '1rem',
    transition: 'color 0.3s ease',
  },
  logoutBtn: {
    background: 'transparent',
    border: 'none',
    color: '#F56565',
    fontWeight: '500',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
};

export default Navbar;
