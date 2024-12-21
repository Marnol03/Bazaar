import '../css/profil.css';
import React, { useRef } from 'react';
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
        <Info />
      </div>
    </>
  );
}

const Info = () => {

  return (
    <div className='info'>
      <h1>Message  </h1>
    </div>
  );
};


export default App;