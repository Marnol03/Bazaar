import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import logo from '../images/logo.png';
import Facebook from '../images/facebook.png';
import Google from '../images/google.png';
import './connexion.css';
import pubImage from '../images/pubImage.png';
import Notification from './Notification';

const LoginForm = ({ setIsLogin }) => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  
  const showNotification = () => {
    setIsNotificationVisible(true);
    setTimeout(() => setIsNotificationVisible(false), 2000); 
  };
  
  let notMessage = "Connexion réussie!";
  
  // Validation en temps réel des entrées
  const validateForm = () => {
    let formErrors = {};
    
    // Validation email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email) {
      formErrors.email = "L'email est requis.";
    } else if (!emailRegex.test(email)) {
      formErrors.email = "L'email n'est pas valide.";
    }
    
    // Validation mot de passe
    if (!motDePasse) {
      formErrors.motDePasse = "Le mot de passe est requis.";
    } else if (motDePasse.length < 6) {
      formErrors.motDePasse = "Le mot de passe doit contenir au moins 6 caractères.";
    }

    setErrors(formErrors);
  };

  useEffect(() => {
    // Valider en temps réel à chaque modification
    validateForm();
  }, [email, motDePasse]);

  const resetClick = () => {
    notMessage = "Un email de récupération a été envoyé!";
    showNotification();
    fetch('http://localhost:5001/api/recover-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log("Erreur lors de la récupération du mot de passe :", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier si le formulaire est valide avant de soumettre
    if (Object.keys(errors).length > 0) {
      return; // Ne pas soumettre si des erreurs existent
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motDePasse }),
      });

      const data = await response.json();

      if (data.message === 'Connexion réussie.') {
        notMessage = "Connexion réussie!";
        showNotification();
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        setErrors({ general: 'E-mail ou mot de passe incorrect.' });
      }
    } catch (error) {
      setErrors({ general: 'Erreur de connexion. Veuillez réessayer.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {isNotificationVisible && (
        <Notification
          message={notMessage}
          duration={2000} 
          onClose={() => console.log("Notification fermée")}
        />
      )}
      {errors.general && <div className="error">{errors.general}</div>}
      
      {/* Champ email */}
      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Entrez votre email"
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      {/* Champ mot de passe */}
      <div className="form-group">
        <label htmlFor="motDePasse">Mot de passe</label>
        <input
          type="password"
          id="motDePasse"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          placeholder="Entrez votre mot de passe"
        />
        {errors.motDePasse && <div className="error">{errors.motDePasse}</div>}
      </div>
      
      <p className="toggle-form" onClick={resetClick}>Mot de passe oublié?</p>

      <button type="submit" className="submit-button" disabled={loading || Object.keys(errors).length > 0}>
        {loading ? 'Chargement...' : 'Se connecter'}
      </button>


      <p className="toggle-form" onClick={() => setIsLogin(false)}>
        Pas encore de compte ? Inscrivez-vous
      </p>
    </form>
  );
};

export default LoginForm;
