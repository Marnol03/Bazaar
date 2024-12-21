import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

    //  composant 
import Home from "./comp/Home"; 

import Connexion from "./comp/connexion";

  
    // client 
    import Compte from "./client/compte"; 
    import Message from "./client/message";  
    import Parametre from "./client/parametre"; 
    import Commande from "./client/commande"; 
    import Acceuil from "./client/acceuil"; 
const App = () => {
  return (
    <>
     
      <Router>
        <Routes>

          {/* Définissez vos routes */}
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/compte" element={<Compte />} />
          <Route path="/message" element={<Message />} />
          <Route path="/commande" element={<Commande />} />
          <Route path="/parametre" element={<Parametre  />} />
          <Route path="/acceuil" element={<Acceuil  />} />
          
        </Routes>
    </Router>
    </>
    
  );
};

export default App;