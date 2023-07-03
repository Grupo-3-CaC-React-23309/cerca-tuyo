import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../authentication/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig/firebaseConfig";

export const AdoptantData = ({
  nombre,
  tipo,
  localidad,
  otrasMascotas,
  apellido,
  domicilio, 
  codigoPostal, 
  condicion, 
  convivientes,
  vacaciones,
  
}) => {
  const { isLoggedIn, userEmail } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const clickClose = () => {
    handleClose();
    onCardClick();
  };

  const deleteClose = () => {
    handleClose();
    onDeleteClick();
  };
  
  return (
    <>
      <Card
        style={{
          width: "18rem",
          height: "25rem",
          cursor: "pointer",
          overflow: "hidden",
          position: "relative",
        }}
        onClick={handleShow}
      >
        <Card.Img
          variant="top"
          src={imagenURL || "https://via.placeholder.com/100"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 0.5s",
          }}
        />
        <Card.Body
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            color: "#fff",
            background:
              "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 70%, rgba(0, 0, 0, 1) 100%)",
            transition: "all 0.5s",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "end",
            flexDirection: "column",
            padding: "1rem",
          }}
        >
          <Card.Title style={{ fontSize: "1.5em" }}>
            {nombre || "Información no disponible"}
          </Card.Title>
          <Card.Text>
            <strong>Tipo:</strong> {tipo ? tipo : "Información no disponible"}
          </Card.Text>
          <Card.Text>
            <strong>Localidad:</strong> {localidad ? localidad : "Información no disponible"}
          </Card.Text>
         </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{nombre || "Información no disponible"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Tipo:</strong> {tipo || "Información no disponible"}
          </p>
          <p>
            <strong>Otras mascotas:</strong> {otrasMascotas || "Información no disponible"}
          </p>
          <p>
            <strong>Apellido:</strong> {apellido ? apellido : "Información no disponible"}
          </p>
          <p>
            <strong>Domicilio:</strong> {domicilio || "Información no disponible"}
          </p>
          </Modal.Body>
        <Modal.Footer>
          {!isLoggedIn ? (
            <OverlayTrigger
              overlay={
                <Tooltip id="tooltip-disabled">
                  'Por favor inicia sesión'
                </Tooltip>
              }
            >
              <span className="d-inline-block">
                <Button
                  variant="primary"
                  onClick={clickClose}
                  disabled={!isLoggedIn}
                  style={{ pointerEvents: !isLoggedIn ? "none" : "auto" }}
                >
                  {textoBoton}
                </Button>
                {userEmail === usuario && (
                  <Button
                    variant="danger"
                    onClick={deleteClose}
                    disabled={!isLoggedIn}
                    style={{ pointerEvents: !isLoggedIn ? "none" : "auto" }}
                  >
                    Eliminar
                  </Button>
                )}
              </span>
            </OverlayTrigger>
          ) : (
            <span className="d-inline-block">
              <Button
                variant="primary"
                onClick={clickClose}
                disabled={preAdoptado}
                style={{ pointerEvents: !isLoggedIn ? "none" : "auto" }}
              >
                {preAdoptado ? "Ya te postulaste" : textoBoton}
              </Button>
              {((userEmail === usuario) && (estado < 20)) &&  (
                <Button
                  variant="danger"
                  onClick={deleteClose}
                  disabled = {preAdoptado}
                  style={{ pointerEvents: !isLoggedIn ? "none" : "auto" }}
                >
                  Eliminar
                </Button>
              )}
            </span>
          )}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdoptantData;
