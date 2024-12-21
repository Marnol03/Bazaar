import React from 'react';
import { IoMdMenu } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { useLocation } from 'react-router-dom'; // Importer useLocation
import franck from '../images/carttephoto.jpg'; // Assurez-vous que le chemin est correct

const Topbar = ({ navigationRef, mainRef }) => {
  const location = useLocation(); // Utiliser useLocation pour obtenir l'URL actuelle
  const pageName = location.pathname.split('/').pop(); // Extraire le nom de la page

  const handleToggleClick = () => {
    if (navigationRef.current && mainRef.current) {
      const isActive = navigationRef.current.classList.contains("active");
      if (isActive) {
        navigationRef.current.classList.remove("active");
        mainRef.current.classList.remove("active");
      } else {
        navigationRef.current.classList.add("active");
        mainRef.current.classList.add("active");
      }
    }
  };

  return (
    <div className='topbar'>
      <div className='toggle' onClick={handleToggleClick}><IoMdMenu /></div>

      <div className='page-name'>
        <h1>{pageName.charAt(0).toUpperCase() + pageName.slice(1) || 'Accueil'}</h1> {/* Afficher le nom de la page */}
      </div>

      <div className='search'>
        <label>
          <input type='text' placeholder='Entrer l id du compte' />
          <div className='iconrecherche'><FaSearch /></div>
        </label>
      </div>

      <div className='langue'>
        <select>
          <option>Français</option> 
          <option>Anglais</option> 
        </select>
      </div>

      <div className='user'> 
        <img src={franck} className="img" alt="utilisateur" />
      </div>
      
    </div>
  );
};

export default Topbar;