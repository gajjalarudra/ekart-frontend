import React from 'react';

const AboutPage = () => {
  return (
    <div style={styles.container}>
      <h2>About Us</h2>
      <p>SuperKart is a demo e-commerce app built for learning full-stack DevOps and development.</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    marginLeft: '260px',
  },
};

export default AboutPage;
