import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import defaultAvatar from '../assets/default-avtar.jpg'; // Make sure this file exists

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Profile Page</h2>

      {user ? (
        <>
          <img
            src={profileImage || defaultAvatar}
            alt="Profile"
            style={styles.avatar}
          />

          {/* This wrapper ensures label appears below the image */}
          <div style={styles.uploadWrapper}>
            <label htmlFor="upload" style={styles.uploadLabel}>
              Choose Profile Picture
              <input
                id="upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={styles.fileInput}
              />
            </label>
          </div>

          <p><strong>Name:</strong> {user.name || 'Name not available'}</p>
          <p><strong>Email:</strong> {user.email || 'superkart@devopspedia.online'}</p>
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
  title: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
    color: '#2b6cb0',
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #3182ce',
    marginBottom: '1rem',
  },
  uploadWrapper: {
    marginBottom: '1.5rem',
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
    transition: 'background-color 0.3s ease',
  },
  fileInput: {
    display: 'none',
  },
};

export default Profile;
