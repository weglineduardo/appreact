import { Navigate } from "react-router-dom";
const { Cookies: kks } = require("react-cookie");
const cok = new kks();
import React, { useState, useContext } from "react";
import { AuthProvider } from "../auth/AuthProvider";
import { iUsuario } from "../interfaces/usuario";
import axios from "axios";

export const PruebaAcordion = ({ children }: { children: JSX.Element }) => {
  return children;
};
