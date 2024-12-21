import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineMessage, MdOutlineSettings } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import logo from '../images/logo.png'; // Assurez-vous que le chemin est correct

const Container = ({ navigationRef, CompteClick, ParametreClick, MessageClick,CommandeClick }) => {
  return (
    <div className="container">
      <div ref={navigationRef} className="navigation">
        <ul>
          <li className="logo-container">
            <a href="#">
              <img src={logo} className="logo" alt="logo" />
            </a>
          </li>
          <li onClick={CompteClick}>
            <a href="#">
              <div className="icon"><FaUserCircle /></div>
              <span className="titre">Compte</span>
            </a>
          </li>
          <li onClick={MessageClick}>
            <a href="#">
              <div className="icon"><MdOutlineMessage /></div>
              <span className="titre">Message</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={ParametreClick}>
              <div className="icon"><MdOutlineSettings /></div>
              <span className="titre">Commande</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={CommandeClick}>
              <div className="icon"><MdOutlineSettings /></div>
              <span className="titre">Paramètre</span>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="icon"><CiLogout /></div>
              <span className="titre">Déconnexion</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Container;