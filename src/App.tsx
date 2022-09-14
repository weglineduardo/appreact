import React from "react";
import logo from "./logo.svg";
import callApi from "./components/callApi";
import "./App.css";
import Accordion from "./screean/acordion";
import NavBar from "./screean/navBar";
import RadioButton from "./screean/radioButton";
import CheckBox from "./screean/checkBox";
import DataBsTarget from "./screean/dataBsTarget";

function App() {
  const BASE_URL = process.env.REACT_APP_BASE_URL_API;

  const CallApi = async () => {
    callApi();
  };
  const r = CallApi();
  console.log(r);
  return (
    <div className="App">
      <NavBar />
      <RadioButton />

      <header className="">
        <CheckBox />
        <button onClick={CallApi} type="button" className="btn btn-primary">
          Primary
        </button>
        <DataBsTarget />
      </header>

      <div className="container-fluid col-12">
        <Accordion />
        <Accordion />
      </div>
    </div>
  );
}

export default App;
