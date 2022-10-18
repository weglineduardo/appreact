//import "./App.css";
import React, { useState, useEffect } from "react";

import NavBar from "./navBar";
import ListaCasosActivos from "./casoActivoId";
import CasoArchivadoId from "./casoArchivadoId";

function CaseArchivedById() {
  return (
    <>
      <NavBar />

      <CasoArchivadoId />
    </>
  );
}

export default CaseArchivedById;
