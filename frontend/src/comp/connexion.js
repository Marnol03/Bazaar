import React, { useState , useEffect} from 'react';
import logo from '../images/logo.png';
import Facebook from '../images/facebook.png';
import Google from '../images/google.png';
import './connexion.css';
import pubImage from '../images/pubImage.png';
import Notification from './Notification';

var notMessage = " ";

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

    fetch('http://localhost:5001/api/recover-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.message === 'Un email de réinitialisation a été envoyé.') {
          notMessage = "Un email de réinitialisation a été envoyé.";
          showNotification();
        }
        else if (data.message === 'Utilisateur non trouvé.') { 
          setErrors({ general: 'Utilisateur non trouvé.' });
        }
        else {
          setErrors({ general: 'Erreur lors de la récupération du mot de passe.' });
        }
      })
      .catch(error => {
        console.log("Erreur lors de la récupération du mot de passe :", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      alert('Veuillez corriger les erreurs dans le formulaire.');
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
      
      {/* Lien pour récupérer le mot de passe */}
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

const RegisterForm = ({ setIsLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [cmotDePasse, setCmotDePasse] = useState('');
  const [numero, setNumero] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const showNotification = () => {
    setIsNotificationVisible(true);
    setTimeout(() => setIsNotificationVisible(false), 2000); 
  };

  const validateForm = () => {
    let formErrors = {};

    // Validation du nom
    if (!name) {
      formErrors.name = "Le nom est requis.";
    }

    // Validation de l'email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email) {
      formErrors.email = "L'email est requis.";
    } else if (!emailRegex.test(email)) {
      formErrors.email = "L'email n'est pas valide.";
    }

    // Validation du numéro de téléphone (optionnel)
    if (numero && !/^\+237\d{8}$/.test(numero)) {
      formErrors.numero = "Le numéro de téléphone n'est pas valide.";
    }

    // Validation du mot de passe
    if (!motDePasse) {
      formErrors.motDePasse = "Le mot de passe est requis.";
    } else if (motDePasse.length < 6) {
      formErrors.motDePasse = "Le mot de passe doit contenir au moins 6 caractères.";
    }

    // Validation de la confirmation du mot de passe
    if (motDePasse !== cmotDePasse) {
      formErrors.cmotDePasse = "Les mots de passe ne correspondent pas.";
    }

    setErrors(formErrors);
  };

  useEffect(() => {
    // Valider en temps réel à chaque modification des champs
    validateForm();
  }, [name, email, motDePasse, cmotDePasse, numero]);

  const handleSubmit = async (e) => {
    setErrors({});
    e.preventDefault();

    // Si des erreurs existent, ne pas soumettre le formulaire
    if (Object.keys(errors).length > 0) {
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

      if (data.message === 'Utilisateur enregistré avec succès.') {
        notMessage = "Inscription réussie!";
        showNotification();
        setTimeout(() => {
          setIsLogin(true); 
        }, 3000);
      } 
      else if (data.message === 'Cet email est déjà utilisé.') {
        setErrors({ email: 'Cet email est déjà utilisé.' });
      }
      else {
        setErrors({ general: 'Erreur lors de l\'inscription.' });
      }
    } catch (error) {
      setErrors({ general: 'Erreur de connexion. Veuillez réessayer.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form r_frm">
      {errors.general && <div className="error">{errors.general}</div>}
      {isNotificationVisible && (
        <Notification
          message="Inscription réussie! Veuillez vous connecter."
          duration={3000}
          onClose={() => console.log("Notification fermée")}
        />
      )}

      {/* Champ nom complet */}
      <div className="form-group">
        <label htmlFor="name">Nom Complet</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Entrez votre nom"
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>

      <div className='num'>
        {/* Champ numéro de téléphone */}
        <div className="form-group">
          <label htmlFor="numero">Téléphone</label>
          <input
            type="tel"
            id="numero"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="+2376********"
          />
          {errors.numero && <div className="error">{errors.numero}</div>}
        </div>

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

      {/* Champ confirmation mot de passe */}
      <div className="form-group">
        <label htmlFor="cmotDePasse">Confirmation Mot de Passe</label>
        <input
          type="password"
          id="cmotDePasse"
          value={cmotDePasse}
          onChange={(e) => setCmotDePasse(e.target.value)}
          placeholder="Confirmez votre mot de passe"
        />
        {errors.cmotDePasse && <div className="error">{errors.cmotDePasse}</div>}
      </div>

      {/* Bouton de soumission */}
      <button type="submit" className="submit-button" disabled={loading || Object.keys(errors).length > 0}>
        {loading ? 'Chargement...' : 'S\'inscrire'}
      </button>

      {/* Lien vers la page de connexion */}
      <p className="toggle-form" onClick={() => setIsLogin(true)}>
        Déjà un compte ? Connectez-vous
      </p>
    </form>
  );
};


export default Connexion;
