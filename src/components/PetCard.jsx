import { useState, useContext } from 'react';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Modal from 'react-bootstrap/Modal';
import AuthContext from '../authentication/AuthContext';

export const PetCard = ({
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
  onCardClick,
  onDeleteClick,
}) => {
  const { isLoggedIn, userEmail } = useContext(AuthContext);


  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Card style={{ width: "18rem", height: "25rem", cursor: 'pointer', overflow: 'hidden', position: 'relative' }} onClick={handleShow}>
        <Card.Img variant="top" src={imagenURL || "https://via.placeholder.com/100"} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.5s' }} />
        <Card.Body style={{ position: 'absolute', bottom: '0', left: '0', color: '#fff', background: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 70%, rgba(0, 0, 0, 1) 100%)', transition: 'all 0.5s', width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'end', flexDirection: 'column', padding: '1rem' }}>
          <Card.Title style={{ fontSize: "1.5em" }}>{nombre || "Información no disponible"}</Card.Title>
          <Card.Text><strong>Sexo:</strong> {sexo ? sexo : "Información no disponible"}</Card.Text>
          <Card.Text><strong>Edad:</strong> {edadCantidad || "Información no disponible"} {edadUnidad || "Información no disponible"}</Card.Text>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{nombre || "Información no disponible"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Tipo:</strong> {tipo || "Información no disponible"}</p>
          <p><strong>Tamaño:</strong> {tamaño || "Información no disponible"}</p>
          <p><strong>Sexo:</strong> {sexo ? sexo : "Información no disponible"}</p>
          <p><strong>Edad:</strong> {edadCantidad || "Información no disponible"} {edadUnidad || "Información no disponible"}</p>
          <p><strong>Peso:</strong> {peso + "kg." || "Información no disponible"}</p>
          <p><strong>Descripción:</strong> {texto || "Información no disponible"}</p>
          <p><strong>Estado:</strong> {textoEstado || "Información no disponible"}</p>
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
                  onClick={onCardClick}
                  disabled={!isLoggedIn}
                  style={{ pointerEvents: !isLoggedIn ? 'none' : 'auto' }}>
                  {textoBoton}
                </Button>
                {(userEmail === usuario) &&
                  <Button
                    variant="danger"
                    onClick={onDeleteClick}
                    disabled={!isLoggedIn}
                    style={{ pointerEvents: !isLoggedIn ? 'none' : 'auto' }}>
                    Eliminar
                  </Button>
                }
              </span>
            </OverlayTrigger>
          ) : (
            <span className="d-inline-block">
              <Button
                variant="primary"
                onClick={onCardClick}
                disabled={!isLoggedIn}
                style={{ pointerEvents: !isLoggedIn ? 'none' : 'auto' }}>
                {textoBoton}
              </Button>
              {(userEmail === usuario) &&
                <Button
                  variant="danger"
                  onClick={onDeleteClick}
                  disabled={!isLoggedIn}
                  style={{ pointerEvents: !isLoggedIn ? 'none' : 'auto' }}>
                  Eliminar
                </Button>
              }
            </span>
          )}
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PetCard;
