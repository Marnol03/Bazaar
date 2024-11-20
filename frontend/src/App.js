import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "./comp/Home"; 
import Connexion from "./comp/connexion";
import ResetPassword from "./comp/ResetPassword";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Définissez vos routes */}
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/connexion/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;