import NavBar from "./screean/navBar";
import React, { useState, Component } from "react";

import { Route, Link } from "react-router-dom";

import { Path, Routes } from "react-router";
import "./App.css";
import App from "./App";
import Login from "./components/login";
import CaseById from "./screean/caseById";
import CaseArchivedById from "./screean/caseArchivedById";
import casoActivoPorNombreProceso from "./screean/casoActivoPorNombreProceso";
import CasoActivoPorNombreProceso from "./screean/casoActivoPorNombreProceso";
import CaseByNameProcess from "./screean/caseByNameProcess";
import CaseArchivedByNameProcess from "./screean/caseArchivedByNameProcess";
import Home from "./screean/home";

function AppRouter() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="app" element={<App />} />
        <Route path="navbar" element={<NavBar />} />
        <Route path="casebyid" element={<CaseById />} />
        <Route path="caseByNameProcess" element={<CaseByNameProcess />} />
        <Route path="casearchivedbyid" element={<CaseArchivedById />} />
        <Route path="casearchivedbyid" element={<CaseArchivedById />} />
        <Route
          path="caseArchivedByNameProcess"
          element={<CaseArchivedByNameProcess />}
        />
      </Routes>
    </div>
  );
}

export default AppRouter;
