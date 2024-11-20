import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; 
import './ResetPassword.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  const location = useLocation();
  const navigate = useNavigate(); // Utilisez useNavigate au lieu de useHistory

  // Récupérer le token de l'URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromURL = params.get('token');
    if (tokenFromURL) {
      setToken(tokenFromURL);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification que les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5001/api/reset-password', {
        token,
        newPassword
      });

      setSuccess(response.data.message);
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        navigate('/connexion'); 
      }, 2000);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Erreur inconnue.');
    }

    setLoading(false);
  };

  return (
    <div className="reset-password-container">
      <h2>Réinitialiser votre mot de passe</h2>
      <form onSubmit={handleSubmit} className="reset-password-form">
        <div className="input-group">
          <label htmlFor="newPassword">Nouveau mot de passe :</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Confirmer le mot de passe :</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Chargement...' : 'Réinitialiser'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
