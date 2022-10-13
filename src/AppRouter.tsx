import Accordion from "./screean/acordion";
import NavBar from "./screean/navBar";
import RadioButton from "./screean/radioButton";
import CheckBox from "./screean/checkBox";
import DataBsTarget from "./screean/dataBsTarget";
import bonitaLogin from "./components/bonitaLogin";
import fetchBonitaLogin from "./components/fetchBonitaLogin";
import fetchCase from "./components/fetchCase";
import unusedIdFetch from "./components/unusedIdFetch";
import React, { useState, Component } from "react";
import bonitaCase from "./components/bonitaCase";
import Cookies from "universal-cookie";
import { Cookies as kks } from "react-cookie";
import axios from "axios";
import { Route, Link } from "react-router-dom";

import { Path, Routes } from "react-router";
import Lista from "./screean/lista";
import "./App.css";
import Home from "./components/home";
import About from "./components/about";
import Contact from "./components/contact";
import App from "./App";
import Login from "./components/login";

function AppRouter() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="app" element={<App />} />
        <Route path="navbar" element={<NavBar />} />
      </Routes>
    </div>
  );
}

export default AppRouter;
