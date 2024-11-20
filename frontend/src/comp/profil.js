
import '../css/profil.css';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import franck from '../images/carttephoto.jpg';
import logo from '../images/logo.png';
import { FaSearch, FaCartPlus } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";

import { LiaShoppingBagSolid } from "react-icons/lia";
import  { FaStar } from 'react-icons/fa';
import { MdOutlineMessage, MdOutlineSettings } from "react-icons/md";

function App() {
  const navigationRef = useRef(null);
  const mainRef = useRef(null);

  const [selectedTab, setSelectedTab] = useState("Compte");

  const handleToggleClick = () => {
    navigationRef.current.classList.toggle("active");
    mainRef.current.classList.toggle("active");
  };

  const handleLinkClick = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <>
      <div className="container">
        <div ref={navigationRef} className="navigation">
          <ul>
            <li className="logo-container">
              <a href="#">
                <img src={logo} className="logo" alt="logo" />
              </a>
            </li>
            <li className={selectedTab === "Compte" ? "hovered" : ""} onClick={() => handleLinkClick("Compte")}>
              <a href="#">
                <div className="icon"> <FaUserCircle /> </div>
                <span className="titre">Compte</span>
              </a>
            </li>
            <li className={selectedTab === "Message" ? "hovered" : ""} onClick={() => handleLinkClick("Message")}>
              <a href="#">
                <div className="icon"> <MdOutlineMessage /> </div>
                <span className="titre">Message</span>
              </a>
            </li>
            <li className={selectedTab === "Parametre" ? "hovered" : ""} onClick={() => handleLinkClick("Parametre")}>
              <a href="#">
                <div className="icon"> <MdOutlineSettings /> </div>
                <span className="titre">Parametre</span>
              </a>
            </li>
            <li className={selectedTab === "Deconnexion" ? "hovered" : ""} onClick={() => handleLinkClick("Deconnexion")}>
              <a href="#">
                <div className="icon"> <CiLogout /> </div>
                <span className="titre">Deconnexion</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ========================== main ======================== */}
      
      <div ref={mainRef} className='main' > 
          <div  className='topbar' >
              <div className='toggle' onClick={handleToggleClick} > <IoMdMenu /> </div>
  
                {/* Recuperation du nom  */}
                
              <div className='search' >
                <label>
                  <input type='text' placeholder='Entrer l id du compte '/>
                  <div className='iconrecherche'><FaSearch /></div>
                </label>
              </div>
              
              <div className='langue' >
                <select className='' >  
                  <option> Français </option> 
                  <option> Anglais </option> 
                  
                </select>
              </div>
  
              <div className='user' > 
              <img src={franck} className="img"  alt="logo" />
              </div>
  
  
          </div>
      </div>

      {/* Contenu affiché dynamiquement */}
      <div className="content" id="content">
        {selectedTab === "Compte" && <Compte />}
        {selectedTab === "Message" && <Message />}
        {selectedTab === "Parametre" && <Parametre />}
        {selectedTab === "Deconnexion" && <Deconnexion />}
      </div>
    </>
  );
}


function Message() {
  return (
    <div className="message">
      <h1>Message</h1>
      <p>Je suis le contenu du message.</p>
    </div>
  );
}

function Compte() {
  return (
    <div className="compte">
      <h1>Compte</h1>
      <p>Je suis le contenu du compte.</p>
    </div>
  );
}

function Parametre() {
  return (
    <div className="parametre">
      <h1>Parametre</h1>
      <p>Je suis le contenu du paramètre.</p>
    </div>
  );
}

function Deconnexion() {
  return (
    <div className="deconnexion">
      <h1>Déconnexion</h1>
      <p>Vous êtes maintenant déconnecté.</p>
    </div>
  );
}

export default App;
