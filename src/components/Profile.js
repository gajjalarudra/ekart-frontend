import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={styles.container}>
      <h2>Profile Page</h2>
      {user ? (
        <>
          <p><strong>Name:</strong> {user.name || 'Name not available'}</p>
          <p><strong>Email:</strong> {user.email || 'Email not available'}</p>
        </>
      ) : (
        <p>You must be logged in to view this page.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '3rem auto 4rem auto',
    padding: '2rem 1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#2d3748',
    textAlign: 'center',
    minHeight: '60vh',
  },
};

export default Profile;
