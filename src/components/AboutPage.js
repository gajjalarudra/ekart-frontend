import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div style={styles.pageWrapper}>
      <h2 style={styles.title}>About SuperKart</h2>
      <p style={styles.description}>
        SuperKart is a demo e-commerce app built for learning full-stack development and DevOps practices. Our goal is to provide a clean, user-friendly shopping experience while showcasing modern web development techniques.
      </p>
        <Link to="/blog/about-superkart" style={{ textDecoration: 'none' }}>
        <button style={styles.readMoreBtn}>Read More</button>
      </Link>
      <p style={styles.footerNote}>
        Stay tuned for exciting updates and features in the near future!
      </p>
    </div>
  );
};

const styles = {
  pageWrapper: {
    maxWidth: '700px',
    margin: '3rem auto',
    padding: '2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',  // transparent white
    borderRadius: '12px',
    boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(12px)',                   // glassmorphism blur
    WebkitBackdropFilter: 'blur(12px)',             // for Safari
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#2d3748',
    textAlign: 'center',
    minHeight: '70vh',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#3182ce',
  },
  description: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    marginBottom: '2rem',
  },
  readMoreBtn: {
    backgroundColor: '#3182ce',
    border: 'none',
    color: 'white',
    padding: '0.6rem 1.4rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
  footerNote: {
    marginTop: '3rem',
    fontSize: '1rem',
    fontStyle: 'italic',
    color: '#718096',
  },
};

export default AboutPage;
