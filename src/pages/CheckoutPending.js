import React from 'react';
import { Link } from 'react-router-dom';
import './BlogDetails.css';
import checkoutImg from '../assets/website-under-construction.jpg'; // Replace with your actual image

const CheckoutPending = () => (
  <div className="blog-details-container">
    <h1 className="blog-details-title">Checkout Coming Soon!</h1>
    <img src={checkoutImg} alt="Checkout pending" className="blog-details-image" />
    <div className="blog-details-content">
      <p>
        🚧 The checkout functionality is currently under development by our amazing team.
      </p>
      <p>
        We are working hard to bring you a seamless and secure checkout experience.
      </p>
      <p>
        💡 Meanwhile, feel free to explore our exciting products, and add your favorites to the cart!
      </p>

      <Link to="/shop" className="shop-link-button">
        🛍️ Go to Products Page
      </Link>

      <p style={{ fontStyle: 'italic', color: '#555', marginTop: '2rem' }}>
        Stay tuned and thank you for shopping with SuperKart! 🛒💙
      </p>
    </div>
  </div>
);

export default CheckoutPending;
