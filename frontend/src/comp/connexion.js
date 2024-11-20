import React, { useState } from 'react';
import logo from '../images/logo.png';
import Facebook from '../images/facebook.png';
import Google from '../images/google.png';
import './connexion.css';
import pubImage from '../images/pubImage.png';
import Notification from './Notification';


const Connexion = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="page-container">
      <div className="left-section">
        <div className="form-container">
          <img src={logo} alt="Logo" className="logo" />
          <h2>{isLogin ? 'Bienvenue' : "S'inscrire"}</h2>
          {isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <RegisterForm setIsLogin={setIsLogin} />}
          <div className="social-login">
            <p> ou se connecter avec :</p>
            <div><button className="google-login"><img src={Google} alt="google_logo" className="google_logo" /> Google</button></div>
            <div><button className="Facebook-login"><img src={Facebook} alt="facebook_logo" className="facebook_logo" />Facebook</button></div>
          </div>
        </div>
      </div>
      <div className="right-section">
        <img src={pubImage} alt="Pub" className="pub-image" />
      </div>
    </div>
  );
};


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
  var notMessage = "Connection reussie!";

  const resetClick = () => {
    fetch('http://localhost:5001/api/recover-password',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email})
    })
      .then(response => response.json())
      .then(data => {
        notMessage = data.message; 
        showNotification();   
      })
      .catch(error => {
        console.error("Erreur lors de la récupération du mot de passe :", error);
      });
  };
  const handleSubmit = async (e) => {
    setErrors({});
    e.preventDefault();

    if (!email || !motDePasse) {
      setErrors({ general: 'Tous les champs sont requis' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motDePasse }),
      });

      const data = await response.json();

      if (data.success) {
        //setMessage('Connexion réussie');
        notMessage = "Connection reussie!";
        showNotification();
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
          message = {notMessage}
          duration={2000} 
          onClose={() => console.log("Notification fermée")}
        />
      )}
      {errors.general && <div className="error">{errors.general}</div>}
      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Entrez votre email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="motDePasse">Mot de passe</label>
        <input
          type="password"
          id="motDePasse"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          placeholder="Entrez votre mot de passe"
        />
      </div>
      <p className="toggle-form" onClick={resetClick}>Mot de passe oublié?</p>
      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? 'Chargement...' : 'Se connecter'}
      </button>
      <p className="toggle-form" onClick={() => setIsLogin(false)}>
        Pas encore de compte ? Inscrivez-vous
      </p>
    </form>
  );
};

const RegisterForm = ({ setIsLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [cmotDePasse, setCmotDePasse] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [numero, setNumero] = useState('');

  const handleSubmit = async (e) => {
    setErrors({});
    e.preventDefault();

    if (!name || !email || !motDePasse || !cmotDePasse) {
      setErrors({ general: 'Tous les champs sont requis' });
      return;
    }

    if (motDePasse !== cmotDePasse) {
      setErrors({ general: 'Les mots de passe ne correspondent pas.' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motDePasse, numero, name }),
      });

      const data = await response.json();

      console.log(data.message);

      if (data.success) {
        setMessage('Inscription réussie');
        setIsLogin(true); // Passer au formulaire de connexion après inscription
      } else {
        setErrors({ general: 'Erreur lors de l\'inscription.' });
      }
    } catch (error) {
      setErrors({ general: 'Erreur de connexion. Veuillez réessayer.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {errors.general && <div className="error">{errors.general}</div>}
      <div className="form-group">
        <label htmlFor="name">Nom Complet</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Entrez votre nom"
        />
      </div>

      <div className='num'><div className="form-group">
        <label htmlFor="numero">Tel</label>
        <input
          type="tel"
          id="numero"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          placeholder="+2376********"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Entrez votre email"
        />
      </div></div>

      <div className="form-group">
        <label htmlFor="motDePasse">Mot de passe</label>
        <input
          type="password"
          id="motDePasse"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          placeholder="Entrez votre mot de passe"
        />
      </div>

      <div className="form-group">
        <label htmlFor="cmotDePasse">Confirmation Mot de Passe</label>
        <input
          type="password"
          id="cmotDePasse"
          value={cmotDePasse}
          onChange={(e) => setCmotDePasse(e.target.value)}
          placeholder="Confirmez votre mot de passe"
        />
      </div>

      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? 'Chargement...' : 'S\'inscrire'}
      </button>
      <p className="toggle-form" onClick={() => setIsLogin(true)}>
        Déjà un compte ? Connectez-vous
      </p>
    </form>
  );
};

export default Connexion;
