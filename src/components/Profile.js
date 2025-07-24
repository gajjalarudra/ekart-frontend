import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const storedImage = localStorage.getItem('profileImage');
  const [profileImage, setProfileImage] = useState(storedImage || null);
  const [tempImage, setTempImage] = useState(null);

  useEffect(() => {
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, [storedImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = () => {
    if (tempImage) {
      setProfileImage(tempImage);
      localStorage.setItem('profileImage', tempImage);
      setTempImage(null);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Profile Page</h2>
      {user ? (
        <>
          <img
            src={tempImage || profileImage || 'https://via.placeholder.com/120'}
            alt="Profile"
            style={styles.profileImage}
          />
          <div style={styles.inputGroup}>
            <label htmlFor="upload" style={styles.uploadLabel}>Edit Profile Picture</label>
            <input
              id="upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.hiddenFileInput}
            />
          </div>
          {tempImage && (
            <div style={styles.buttonWrapper}>
              <button onClick={handleSaveImage} style={styles.saveBtn}>Save Photo</button>
            </div>
          )}
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
  profileImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '1rem',
    border: '2px solid #3182ce'
  },
  inputGroup: {
    marginBottom: '1rem'
  },
  uploadLabel: {
    display: 'inline-block',
    backgroundColor: '#3182ce',
    color: 'white',
    padding: '0.5rem 1.2rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem'
  },
  hiddenFileInput: {
    display: 'none'
  },
  buttonWrapper: {
    marginBottom: '1.5rem'
  },
  saveBtn: {
    backgroundColor: '#3182ce',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.4rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem'
  }
};

export default Profile;
