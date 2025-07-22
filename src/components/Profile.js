import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={styles.container}>
      <h2>Profile Page</h2>
      {user ? (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </>
      ) : (
        <p>You must be logged in to view this page.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    marginLeft: '260px', // accommodate sidebar
  },
};

export default Profile;
