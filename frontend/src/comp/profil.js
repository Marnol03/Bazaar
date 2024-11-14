
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

  const handleToggleClick = () => {
    navigationRef.current.classList.toggle("active");
    mainRef.current.classList.toggle("active");
  };

  const handleLinkClick = (e) => {
    const list = navigationRef.current.querySelectorAll("li");
    list.forEach(item => {
      item.classList.remove("hovered");
    });
    e.currentTarget.classList.add("hovered");
  };




  return (
      <>
      <div className='container'  > 
        <div ref={navigationRef}  className='navigation'   >
          <ul>
              <li onClick={handleLinkClick}   >
                <a href='#' >
                <img src={logo} className="logo"  alt="logo" />
                    
                </a>
              </li>
              <li onClick={handleLinkClick} >
                <a href='#' >
                    <div className='icon'   > <FaUserCircle/> </div>
                    <span className='titre' > Compte </span>
                </a>
              </li>
              <li onClick={handleLinkClick} >
                <a href='#' >
                    <span className='icon' > <MdOutlineMessage/> </span>
                    <span className='titre' > Message </span>
                </a>
              </li>
              <li onClick={handleLinkClick} >
                <a href='#' >
                    <span className='icon' > <MdOutlineSettings/> </span>
                    <span className='titre' > Parametre </span>
                </a>
              </li>
              <li onClick={handleLinkClick} >
                <a href='#' >
                    <span className='icon' > <CiLogout/> </span>
                    <span className='titre' > Deconnexion </span>
                </a>
              </li>
          </ul>
        </div>
      </div>
  
      {/* ========================== main ======================== */}
      
      <div className='main' > 
          <div ref={mainRef} className='topbar' >
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
      </>
    ); 
  
}



export default App;