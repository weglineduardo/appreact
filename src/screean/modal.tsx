import React, { useState } from "react";
//import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

/*interface Props {
  title: string;
  content: string;
  information: { number: number; name: string };
  sum: (n: number) => number;
}*/
interface Props {
  id: string;
}
const Modals: React.FC<Props> = ({ id }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-primary" onClick={handleShow}>
        ver
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="">
          <Modal.Title>Titulo del caso</Modal.Title>
        </Modal.Header>
        <Modal.Body>id del caso a buscar {id} mas toda la info </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleClose}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modals;
