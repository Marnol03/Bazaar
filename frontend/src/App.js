import React from "react";
import { BrowserRouter  } from "react-router-dom";
import Connexion from "./connexion";
import Login from "./login";


const App = () => {
  return (
    <>
      <BrowserRouter>
      <Login/>
      
      </BrowserRouter>
    </>
  );
}



export default App;