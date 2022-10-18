import React, { useState, useContext } from "react";
import Cards from "../components/cards";
import NavBar from "./navBar";

function Home() {
  return (
    <>
      <div className="App">
        <NavBar />
        <Cards />
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />
         <Accordion key={"hero.id"} />*/}
        </header>
      </div>
    </>
  );
}

export default Home;
