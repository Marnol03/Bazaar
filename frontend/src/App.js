import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./comp/AuthContext";
import Home from "./comp/Home"; 
import Connexion from "./comp/connexion";
import ResetPassword from "./comp/ResetPassword";
import Panier from './comp/panier';

// Composant principal
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/connexion/reset-password" element={<ResetPassword />} />
          <Route path="/panier" element={<Panier />} />

          {/* Route 404 par défaut */}
          <Route path="*" element={<div>Page non trouvée</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
