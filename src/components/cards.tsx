import React from "react";

function Cards() {
  return (
    <div>
      <div className="container ">
        <div className="row shadow p-2 mb-3 bg-white rounded">
          <div className="row">
            <div className="col">
              {" "}
              <div></div>
              <div>
                {" "}
                <div className="card text-white bg-danger mb-3">
                  <div className="card-header">Incidente</div>
                  <div className="card-body">
                    <h4 className="card-title">Informar incidente</h4>
                    <p className="card-text">Un indicente es ......</p>
                  </div>
                  <button className="btn btn-primary btn-sm">
                    Iniciar un nuevo incidente
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div></div>
              <div>
                {" "}
                <div className="card text-white bg-info mb-3">
                  <div className="card-header">Requerimiento</div>
                  <div className="card-body">
                    <h4 className="card-title">Informar requrimiento</h4>
                    <p className="card-text">Un requerimiento es bla bla</p>
                  </div>
                  <button className="btn btn-primary btn-sm">
                    Iniciar un nuevo requerimiento
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div></div>
              <div>
                {" "}
                <div className="card text-white bg-success mb-3">
                  <div className="card-header">Consulta</div>
                  <div className="card-body">
                    <h4 className="card-title">Consultoria</h4>
                    <p className="card-text">
                      Una consultoria es.... bla bla .
                    </p>
                  </div>
                  <button className="btn btn-primary btn-sm">
                    Iniciar una nueva consultoria
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Asistencia telefonica ayuda
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div></div>
                    <div>
                      {" "}
                      <div className="card text-dark bg-light  mb-1">
                        <div className="card-header">Ayuda</div>
                        <div className="card-body">
                          <h4 className="card-title">Soporte</h4>
                          <p className="card-text">Teldfono, email...etc</p>
                        </div>
                        <button className="btn btn-primary btn-sm">
                          Iniciar ayuda
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
