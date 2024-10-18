import React from "react";
import { BrowserRouter  } from "react-router-dom";
import Home from "./comp/Home";
import Nav from "./comp/Nav";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Nav/>
      <Home/>
      </BrowserRouter>
    </>
  );
}

export default App;