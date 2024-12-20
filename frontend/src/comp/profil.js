import '../css/profil.css';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Topbar from "./topbar";
import Container from "./container"; 

function App() {
  const navigationRef = useRef(null);
  const mainRef = useRef(null);
  const navigate = useNavigate();

  const CompteClick = () => {
    navigate('/compte'); 
  };
  const ParametreClick = () => {
    navigate('/Parametre'); 
  };
  const MessageClick = () => {
    navigate('/message'); 
  };

  return (
    <>
      <Container 
        navigationRef={navigationRef} 
        CompteClick={CompteClick} 
        ParametreClick={ParametreClick}  
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
      <h1>Bonjour  </h1>
    </div>
  );
};


export default App;