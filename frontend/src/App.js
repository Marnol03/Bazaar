import React from "react";
import { BrowserRouter  } from "react-router-dom";
import Connexion from "./comp/connexion";
import Login from "./comp/login";


import Home from "./comp/Home";
import Nav from "./comp/nav";


const App = () => {
  return (
    <>
      <BrowserRouter>

      <Nav/>
      <Login/>

      </BrowserRouter>
    </>
  );
}

export default App;