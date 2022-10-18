import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
function Homed() {
  return (
    <>
      <div>
        <h1>This is the home page</h1>
        <Link to="about">Click to view our about page</Link>
        <Link to="contact">Click to view our contact page</Link>
        <Link to="navbar">Click to view our contact page</Link>
      </div>
    </>
  );
}

export default Homed;
