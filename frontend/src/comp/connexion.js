import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import logo from '../images/logo.png';
import Sms from '../images/sms.jpeg';
import Facebook from '../images/facebook.png';
import Google from '../images/google.png';
import { FaCartPlus } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import '../css/connexion.css';
import pubImage from '../images/pubImage.png'
import Nav from './nav';

const Connexion = () => {
  const [isLogin, setIsLogin] = useState(true); // État pour basculer entre le formulaire de connexion et d'inscription

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission de formulaire pour la connexion
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
        <input type="password" id="motDePasse" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} placeholder="Entrez votre mot de passe" />
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission de formulaire pour l'inscription
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
        <input type="password" id="motDePasse" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} placeholder="Entrez votre mot de passe" />
        {errors.motDePasse && <div className="error">{errors.motDePasse}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="cmotDePasse">Confirmation Mot de Passe</label>
        <input type="password" id="cmotDePasse" value={cmotDePasse} onChange={(e) => setCmotDePasse(e.target.value)} placeholder="Confirmez votre mot de passe" />
        {errors.cmotDePasse && <div className="error">{errors.cmotDePasse}</div>}
      </div>

      <button type="submit" className="submit-button">S'inscrire</button>
      <p className="toggle-form" onClick={() => setIsLogin(true)}>Déjà un compte ? Connectez-vous</p>
    </form>
  );
};


const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pays, setPays] = useState('cameroun');
  const [motDePasse, setMotDePasse] = useState('');
  const [cmotDePasse, setCmotDePasse] = useState('');
  const [numero, setNumero] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validateNumero = (value) => /^\d{9}$/.test(value.trim());

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!e.target.value) {
      setErrors((prev) => ({ ...prev, name: 'Veuillez entrer votre nom.' }));
    } else {
      setErrors((prev) => ({ ...prev, name: '' }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setErrors((prev) => ({ ...prev, email: 'Veuillez entrer un email valide.' }));
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const handleMotDePasseChange = (e) => {
    setMotDePasse(e.target.value);
    if (e.target.value.length < 6) {
      setErrors((prev) => ({ ...prev, motDePasse: 'Le mot de passe doit contenir au moins 6 caractères.' }));
    } else {
      setErrors((prev) => ({ ...prev, motDePasse: '' }));
    }
  };

  const handleCmotDePasseChange = (e) => {
    setCmotDePasse(e.target.value);
    if (e.target.value !== motDePasse) {
      setErrors((prev) => ({ ...prev, cmotDePasse: 'Les mots de passe ne correspondent pas.' }));
    } else {
      setErrors((prev) => ({ ...prev, cmotDePasse: '' }));
    }
  };

  const handleNumeroChange = (e) => {
    setNumero(e.target.value);
    if (!validateNumero(e.target.value)) {
      setErrors((prev) => ({ ...prev, numero: 'Le numéro de téléphone doit comporter exactement 9 chiffres.' }));
    } else {
      setErrors((prev) => ({ ...prev, numero: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !motDePasse || !cmotDePasse || !numero) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Veuillez entrer un email valide.');
      return;
    }

    if (motDePasse !== cmotDePasse) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    if (!validateNumero(numero)) {
      alert('Le numéro de téléphone doit être exactement 9 chiffres.');
      return;
    }

    // Soumettre les informations
    console.log({
      pays,
      name,
      email,
      motDePasse,
      cmotDePasse,
      numero,
    });
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
        <input type="password" id="motDePasse" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} placeholder="Entrez votre mot de passe" />
        {errors.motDePasse && <div className="error">{errors.motDePasse}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="cmotDePasse">Confirmation Mot de Passe</label>
        <input type="password" id="cmotDePasse" value={cmotDePasse} onChange={(e) => setCmotDePasse(e.target.value)} placeholder="Confirmez votre mot de passe" />
        {errors.cmotDePasse && <div className="error">{errors.cmotDePasse}</div>}
      </div>

      <button type="submit" className="submit-button">Envoyer</button>
    </form>
  );
};

export default Connexion;
