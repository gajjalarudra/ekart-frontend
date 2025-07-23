import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="custom-navbar">
      <div className="custom-navbar-container">
        <Link to="/products" className="custom-navbar-brand" onClick={() => setMenuOpen(false)}>
          <i className="fas fa-shopping-cart"></i> SuperKart
        </Link>

        <div className={`custom-navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/blog" className="custom-nav-item" onClick={() => setMenuOpen(false)}>
            <i className="fas fa-blog"></i> Blog
          </Link>
          <Link to="/about" className="custom-nav-item" onClick={() => setMenuOpen(false)}>
            <i className="fas fa-info-circle"></i> About
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="custom-nav-item" onClick={() => setMenuOpen(false)}>
                <i className="fas fa-user"></i> Profile
              </Link>
              <Link to="/cart" className="custom-nav-item" onClick={() => setMenuOpen(false)}>
                <i className="fas fa-shopping-cart"></i> Cart ({cartItems?.length || 0})
              </Link>
              <button className="custom-nav-item logout-btn" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="custom-nav-item" onClick={() => setMenuOpen(false)}>
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
              <Link to="/signup" className="custom-nav-item" onClick={() => setMenuOpen(false)}>
                <i className="fas fa-user-plus"></i> Signup
              </Link>
            </>
          )}
        </div>

        <div className="custom-navbar-toggle" onClick={toggleMenu}>
          <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
