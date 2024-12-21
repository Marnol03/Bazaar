import React, { useState, useRef } from 'react';
import { FaLowVision } from 'react-icons/fa';
import logo from '../images/logo.png';
import Facebook from '../images/facebook.png';
import Google from '../images/google.png';
import '../css/connexion.css';
import pubImage from '../images/pubImage.png';
import { useNavigate } from 'react-router-dom';

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
            <p>ou se connecter avec :</p>
            <div>
              <button className="google-login">
                <img src={Google} alt="google_logo" className="google_logo" /> Google
              </button>
            </div>
            <div>
              <button className="facebook-login">
                <img src={Facebook} alt="facebook_logo" className="facebook_logo" /> Facebook
              </button>
            </div>
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
  const motDePasseRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission de formulaire pour la connexion
    navigate('/acceuil'); 
  };

  const togglePassWord = (e) => {
    motDePasseRef.current.type = motDePasseRef.current.type === 'password' ? 'text' : 'password';
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Entrez votre email" />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="motDePasse">Mot de passe</label>
        <div className="password-container">
          <input type="password" id="motDePasse" ref={motDePasseRef} 
            value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} 
            placeholder="Entrez votre mot de passe" />
          <FaLowVision id="check" onClick={togglePassWord} />
        </div>
        {errors.motDePasse && <div className="error">{errors.motDePasse}</div>}
      </div>

      <button type="submit" className="submit-button">Se connecter</button>
      <p className="toggle-form" onClick={() => setIsLogin(false)}>Pas encore de compte ? Inscrivez-vous</p>
    </form>
  );
};

const RegisterForm = ({ setIsLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [cmotDePasse, setCmotDePasse] = useState('');
  const [errors, setErrors] = useState({});
  const motDePasseRef = useRef(null);
  const cmotDePasseRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission de formulaire pour l'inscription
  };

  const togglePassWord = (e) => {
    motDePasseRef.current.type = motDePasseRef.current.type === 'password' ? 'text' : 'password';
    cmotDePasseRef.current.type = cmotDePasseRef.current.type === 'password' ? 'text' : 'password';
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="name">Nom Complet</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Entrez votre nom" />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Entrez votre email" />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="motDePasse">Mot de passe</label>
        <div className="password-container">
          <input type="password" id="motDePasse" ref={motDePasseRef} value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} placeholder="Entrez votre mot de passe" />
          <div className='check' onClick={togglePassWord} >
            <FaLowVision id="check"  />
          </div>
        </div>
        {errors.motDePasse && <div className="error">{errors.motDePasse}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="cmotDePasse">Confirmation Mot de Passe</label>
        <div className="password-container">
          <input type="password" id="cmotDePasse" ref={cmotDePasseRef} value={cmotDePasse} onChange={(e) => setCmotDePasse(e.target.value)} placeholder="Confirmez votre mot de passe" />
          <FaLowVision id="check" onClick={togglePassWord} />
        </div>
        {errors.cmotDePasse && <div className="error">{errors.cmotDePasse}</div>}
      </div>

      <button type="submit" className="submit-button">S'inscrire</button>
      <p className="toggle-form" onClick={() => setIsLogin(true)}>Déjà un compte ? Connectez-vous</p>
    </form>
  );
};

export default Connexion;