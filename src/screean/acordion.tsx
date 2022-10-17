import "../../node_modules/bootswatch/dist/journal/bootstrapDev.css";
import "bootswatch/dist/js/bootstrap";
import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Lista from "./lista";
import Tables from "./tables";
import ListItems from "../components/ListItems";
import Modals from "./modal";
import Children from "./child";
import ButtonComponent from "../components/nave";
import CaseById from "./caseById";

const Accordion = () => {
  let valor = [];
  const userID = 4;
  const rsl = `JSESSIONID=${userID};X_Bonita_API_Token=${userID}; bonita.tenant=1; BOS_Locale=en`;

  const [caseList, setCaseList] = useState([]);
  const [cases, setCases] = useState([]);

  const [comments, setComments] = useState([undefined]);

  //console.log("Accordion", caseList[0]);

  const getCaseList = async () => {
    obtenerCaseList();
  };
  const obtenerCaseList = async () => {
    const cookies = new Cookies();
    let JSESSIONIDNODE = cookies.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
    axios.defaults.baseURL = "http://localhost:8080";

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;

    axios
      .get(
        "bonita/portal/resource/app/userAppBonita/case-list/API/bpm/case?c=10&p=0&d=processDefinitionId&d=started_by&d=startedBySubstitute&f=user_id=4&n=activeFlowNodes&n=failedFlowNodes&t=0"
      )
      .then((resp) => {
        let result = resp;

        setCaseList(result.data);
        console.log(result.data);
        console.log(caseList.forEach((c) => console.log(c)));
        console.log(result.data[0]);
        setCases(result.data[0]);

        console.log(JSON.stringify(cases));
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };

  const fetchComments = async () => {
    const response = await axios(
      "https://jsonplaceholder.typicode.com/comments"
    );
    setComments(response.data);
    console.log(comments);
  };
  //console.log(caseList[0]);
  //getCaseList();
  const information = { number: 25, name: "props" };
  const funSum = () => {
    return 33 + 2;
  };
  /*const [visibilidad, setVisibilidad] = useState(false);
  const traercomponente = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setVisibilidad(true);
  };
  <ButtonComponent />;*/
  return (
    <>
      <div className="col-12 row">
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
                Lista de casos
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <Lista />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordion;

/*

      <Children
        title={"title"}
        content={"content"}
        information={information}
        sum={funSum}
      />
      <button className="btn btn-succes" onClick={() => traercomponente}>
        traer componente
      </button>
      
{JSON.stringify(
                    cases.map((user) => (
                      <div className="user" key={user}>
                        {user}
                      </div>
                    ))
                  )} */
