import React, { useState } from 'react';
import axios from 'axios';
import './ResetPasswordModal.css'; // Styling file below

const ResetPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleReset = async () => {
    setError('');
    setSuccess('');

    if (newPassword !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post('https://superkart.devopspedia.online/auth/reset-password', {
        email,
        newPassword,
      });
      setSuccess('✅ Password updated. You can now login.');
      setTimeout(onClose, 2000);
    } catch (err) {
      setError('❌ Failed to reset password');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>🔐 Reset Password</h3>

        {success && <div className="success-msg">{success}</div>}
        {error && <div className="error-msg">{error}</div>}

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <div className="modal-buttons">
          <button className="btn-reset" onClick={handleReset}>Reset Password</button>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
