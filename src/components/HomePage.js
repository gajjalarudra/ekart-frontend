import React from 'react';
import bannerImage from '../assets/banner.jpg'; // replace with your actual image filename

const HomePage = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
        minHeight: '100vh',
      }}
    >
      <h1 className="mb-4 display-4" style={{ fontWeight: '700', color: '#2d3748' }}>
        Welcome to <span style={{ color: '#FFA500' }}>SuperKart</span> 🛒
      </h1>

      <p className="lead mb-5" style={{ maxWidth: '800px', color: '#4a5568' }}>
        🎁 Enjoy exclusive weekly offers, amazing discounts, and free gifts on shopping over ₹5000!
        <br />Shop smarter, save bigger — only at <strong>SuperKart</strong>!
      </p>

      <img
        src={bannerImage}
        alt="SuperKart Banner"
        style={{
          width: '100%',
          maxWidth: '1000px',
          height: 'auto',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        }}
      />
    </div>
  );
};

export default HomePage;
