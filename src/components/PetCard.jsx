import { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../authentication/AuthContext";
import { collection, getDocs, query, where, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebaseConfig";

export const PetCard = ({
  petId,
  nombre,
  tipo,
  tamaño,
  sexo,
  peso,
  edadCantidad,
  edadUnidad,
  texto,
  textoEstado,
  imagenURL,
  usuario,
  textoBoton,
  estado,
  onCardClick,
  onDeleteClick,
}) => {
  const { isLoggedIn, userEmail } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);

  const isPreAdoptado = async (PetId, Usuario) => {
    if (isLoggedIn) {
      const q = query(
        collection(db, `pets/${PetId}/adoptants`),
        where("usuario", "==", Usuario)
      );
      const querySnapshot = await getDocs(q);
      setPreAdoptado(!querySnapshot.empty);
    }
  };

  const [preAdoptado, setPreAdoptado] = useState(false);

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

  const handleAdopt = async () => {
    const adoptantRef = doc(db, `pets/${petId}/adoptants`, userEmail);
    await setDoc(adoptantRef, { usuario: userEmail, petId: petId });
    setPreAdoptado(true);
  };

  const handleUnadopt = async () => {
    const adoptantRef = doc(db, `pets/${petId}/adoptants`, userEmail);
    await deleteDoc(adoptantRef);
    setPreAdoptado(false);
  };

  useEffect(() => {
    isPreAdoptado(petId, userEmail);
  }, [petId, userEmail, isLoggedIn]);

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
            <strong>Sexo:</strong> {sexo ? sexo : "Información no disponible"}
          </Card.Text>
          <Card.Text>
            <strong>Edad:</strong> {edadCantidad || "Información no disponible"}{" "}
            {edadUnidad || "Información no disponible"}
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
            <strong>Tamaño:</strong> {tamaño || "Información no disponible"}
          </p>
          <p>
            <strong>Sexo:</strong> {sexo ? sexo : "Información no disponible"}
          </p>
          <p>
            <strong>Edad:</strong> {edadCantidad || "Información no disponible"}{" "}
            {edadUnidad || "Información no disponible"}
          </p>
          <p>
            <strong>Peso:</strong> {peso + "kg." || "Información no disponible"}
          </p>
          <p>
            <strong>Descripción:</strong> {texto || "Información no disponible"}
          </p>
          <p>
            <strong>Estado:</strong>{" "}
            {textoEstado || "Información no disponible"}
          </p>
        </Modal.Body>
        <Modal.Footer>
          {!isLoggedIn ? (
            <OverlayTrigger
              overlay={<Tooltip id="tooltip-disabled">Por favor inicia sesión</Tooltip>}
            >
              <span className="d-inline-block">
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
              {!preAdoptado && (
                <Button
                  variant="primary"
                  onClick={handleAdopt}
                  disabled={preAdoptado}
                  style={{ pointerEvents: !isLoggedIn ? "none" : "auto" }}
                >
                  {textoBoton}
                </Button>
              )}
              {preAdoptado && (
                <Button
                  variant="danger"
                  onClick={handleUnadopt}
                  style={{ pointerEvents: !isLoggedIn ? "none" : "auto" }}
                >
                  Ya no me interesa 😢
                </Button>
              )}
              {((userEmail === usuario) && (estado < 20)) && (
                <Button
                  variant="danger"
                  onClick={deleteClose}
                  disabled={preAdoptado}
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

export default PetCard;
