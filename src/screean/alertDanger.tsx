import React from "react";
import "../../node_modules/bootswatch/dist/journal/bootstrapDev.css";
import "bootswatch/dist/js/bootstrap";
import "bootswatch/dist/js/bootstrap";
//import "../App.css";

function AlertDanger() {
  return (
    <div className="alert alert-dismissible alert-primary">
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
      ></button>
      <strong>Oh snap!</strong>{" "}
      <a href="#" className="alert-link">
        Change a few things up
      </a>{" "}
      and try submitting again.
    </div>
  );
}

export default AlertDanger;
