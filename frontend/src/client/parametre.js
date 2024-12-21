import '../css/profil.css';
import React, { useRef,useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



 // equipement de profil
 import Topbar from "../comp/topbar";
 import Container from "../comp/container"; 
 
   // Lien 
   import { routes } from '../comp/lien'; 
 
function App() {
  const navigationRef = useRef(null);
  const mainRef = useRef(null);
  const navigate = useNavigate();
  const CompteClick = () => {
    navigate(routes.compte); // Utiliser les routes
  };
  const ParametreClick = () => {
    navigate(routes.parametre); // Utiliser les routes
  };
  const CommandeClick = () => {
    navigate(routes.commande); // Utiliser les routes
  };
  const MessageClick = () => {
    navigate(routes.message); // Utiliser les routes
  };

  return (
    <>
      <Container 
        navigationRef={navigationRef} 
        CompteClick={CompteClick} 
        ParametreClick={ParametreClick}  
        CommandeClick={CommandeClick}  
        MessageClick={MessageClick}  

      />
      <div ref={mainRef} className='main'>
        <Topbar navigationRef={navigationRef} mainRef={mainRef} />
        <Parametre />
      </div>
    </>
  );
}

const Parametre = () => {
  // State pour stocker les différents paramètres
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Charger les paramètres utilisateur depuis le serveur
  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const response = await fetch('/api/user/settings');
        const data = await response.json();
        setUsername(data.username);
        setEmail(data.email);
        setNotifications(data.notifications);
        setDarkMode(data.darkMode);
      } catch (error) {
        console.error('Erreur lors du chargement des paramètres :', error);
      }
    };
    fetchUserSettings();
  }, []);

  // Fonction pour mettre à jour les paramètres
  const handleSaveSettings = async () => {
    try {
      await fetch('/api/user/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          notifications,
          darkMode,
        }),
      });
      console.log('Paramètres enregistrés avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des paramètres :', error);
    }
  };

  return (
    <div className="settings-page">
      <h1>Paramètres</h1>
      <div className="form-group">
        <label htmlFor="username">Nom d'utilisateur :</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="notifications">Notifications :</label>
        <input
          type="checkbox"
          id="notifications"
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="darkMode">Mode sombre :</label>
        <input
          type="checkbox"
          id="darkMode"
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
        />
      </div>
      <button onClick={handleSaveSettings}>Enregistrer les paramètres</button>
    </div>
  );
};


export default App;