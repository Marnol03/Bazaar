import '../css/compte.css';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import franck from '../images/carttephoto.jpg';    

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
        <InfoPersonnel />
      </div>
    </>
  );
}

const InfoPersonnel = () => {
  const [userInfo, setUserInfo] = useState({
    id: 'cl00001',
    name: 'Jean Pierre',
    email: '.....@gmail.com',
    password: '***********',
    phone: '+237*********',
    address: 'Cameroun: baf***; entre**',
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [image, setImage] = useState(franck);
  const [newImage, setNewImage] = useState('');

  const handleEditClick = (field) => {
    setEditField(field);
    setEditValue(userInfo[field]);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleSave = () => {
    setUserInfo({ ...userInfo, [editField]: editValue });
    setModalOpen(false);
  };

  const handleImageChange = () => {
    setModalOpen(true); // Ouvrir le modal pour changer l'image
  };

  const handleImageSubmit = () => {
    if (newImage) {
      setImage(newImage); // Changer l'image avec le nouveau chemin
      setModalOpen(false); // Fermer le modal
    }
  };

  return (
    <div className='cont'>
      <div className="profile-header">
        <img src={image} className="log" alt="log" />
        <span className="change-image-icon" onClick={handleImageChange}>✎</span>
      </div>
      <h2>Informations du Compte</h2>

      <form className="form">
        {Object.keys(userInfo).map((key) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <div className="input-wrapper">
              <input
                type={key === 'password' ? 'password' : 'text'}
                id={key}
                value={userInfo[key]}
                className='value'
                readOnly
              />
              <span className="edit-icon" onClick={() => handleEditClick(key)}>✎</span>
            </div>
          </div>
        ))}
      </form>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h3>Modifier l'image</h3>
            <input
              type="text"
              placeholder="Entrez le chemin de la nouvelle image"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
            />
            <button onClick={handleImageSubmit}>Changer l'image</button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h3>Modifier {editField.charAt(0).toUpperCase() + editField.slice(1)}</h3>
            <input
              type={editField === 'password' ? 'password' : 'text'}
              value={editValue}
              onChange={handleInputChange}
            />
            <button onClick={handleSave}>Enregistrer</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;