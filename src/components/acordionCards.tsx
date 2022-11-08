import React from "react";
import ChildAcodionCard from "./childAcodionCard";
import ChildCard from "./childCard";

function AcordionCards() {
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
                <ChildAcodionCard
                  idAcordion={"Incidente"}
                  titleAcordion={"Incidentes"}
                  cardHeader={"Incidente"}
                  cardTitle={"Informar incidente."}
                  body={"Un indicente es ......"}
                  textButton={"Iniciar un nuevo incidente"}
                  routeUrl="nuevo-incidente"
                  style={"danger"}
                />
              </div>
            </div>
            <div className="col">
              <div></div>
              <div>
                {" "}
                <ChildAcodionCard
                  idAcordion={"Requerimiento"}
                  titleAcordion={"Requerimientos"}
                  cardHeader={"Requerimiento"}
                  cardTitle={"Informar requerimiento"}
                  body={"Un requerimiento es bla bla"}
                  textButton={"Iniciar un nuevo requerimiento"}
                  routeUrl="nuevo-service-request"
                  style={"info"}
                />
              </div>
            </div>
            <div className="col">
              <div></div>
              <div>
                {" "}
                <ChildAcodionCard
                  idAcordion={"Consultoria"}
                  titleAcordion={"Consultorias"}
                  cardHeader={"Consultoria"}
                  cardTitle={"Solicitar una Consultoria"}
                  body={"Una consultoria es.... bla bla"}
                  textButton={"Iniciar una nueva consultoria"}
                  routeUrl="routeUrl"
                  style={"success"}
                />
              </div>
            </div>
            <div className="col">
              <ChildAcodionCard
                idAcordion={"Ticket"}
                titleAcordion={"Tickets"}
                cardHeader={"Ticket"}
                cardTitle={"Tickets sin activo asociado"}
                body={"El Ticket es bla bla"}
                textButton={"Iniciar Ticket"}
                routeUrl="routeUrl"
                style={"warning"}
              />
            </div>
            <div className="col">
              <ChildAcodionCard
                idAcordion={"Ayuda"}
                titleAcordion={"Asistencia telefonica ayuda"}
                cardHeader={"Ayuda"}
                cardTitle={"Soporte"}
                body={"Telefono, email...etc"}
                textButton={"Iniciar ayuda"}
                routeUrl="routeUrl"
                style={"light"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcordionCards;
