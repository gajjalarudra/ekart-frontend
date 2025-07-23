import React from 'react';

const BlogPage = () => {
  return (
    <div style={styles.pageWrapper}>
      <h2 style={styles.title}>Welcome to the SuperKart Blog!</h2>
      <p style={styles.intro}>
        Discover the latest trends, tips, and stories about online shopping,
        product reviews, and smart buying decisions. We're here to help you
        shop smarter and live better.
      </p>
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Top 10 Summer Essentials</h3>
          <p style={styles.cardText}>
            Stay cool and stylish this summer with our curated list of must-have products.
          </p>
          <button style={styles.readMoreBtn} onClick={() => alert('Read more about Summer Essentials')}>
            Read More
          </button>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>How to Choose the Perfect Gadget</h3>
          <p style={styles.cardText}>
            Tips and tricks to help you select gadgets that fit your lifestyle and budget.
          </p>
          <button style={styles.readMoreBtn} onClick={() => alert('Read more about Choosing Gadgets')}>
            Read More
          </button>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Behind the Scenes at SuperKart</h3>
          <p style={styles.cardText}>
            Learn how we source products and ensure quality for our customers.
          </p>
          <button style={styles.readMoreBtn} onClick={() => alert('Read more about SuperKart')}>
            Read More
          </button>
        </div>
      </div>
      <p style={styles.footerNote}>
        Stay tuned for exciting updates and more blog posts soon!
      </p>
    </div>
  );
};

const styles = {
  pageWrapper: {
    maxWidth: '960px',
    margin: '3rem auto 4rem auto',
    padding: '2rem 1rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // subtle transparent background
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    color: '#2d3748',
    textAlign: 'center',
    minHeight: '75vh',
  },
  title: {
    fontSize: '2.6rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#3182ce',
  },
  intro: {
    fontSize: '1.3rem',
    marginBottom: '2.5rem',
    lineHeight: '1.6',
    color: '#4a5568',
  },
  cardsContainer: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
    borderRadius: '14px',
    padding: '1.8rem',
    flex: '1 1 300px',
    maxWidth: '300px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'default',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHover: {
    transform: 'translateY(-6px)',
    boxShadow: '0 16px 36px rgba(0,0,0,0.12)',
  },
  cardTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#2b6cb0',
  },
  cardText: {
    fontSize: '1.05rem',
    color: '#4a5568',
    flexGrow: 1,
  },
  readMoreBtn: {
    marginTop: '1.5rem',
    alignSelf: 'flex-start',
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
    marginTop: '4rem',
    fontSize: '1rem',
    fontStyle: 'italic',
    color: '#718096',
    textAlign: 'center',
  },
};

export default BlogPage;
