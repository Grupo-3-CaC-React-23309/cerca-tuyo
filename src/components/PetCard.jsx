import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

export const PetCard = ({
  nombre,
  tipo,
  tamaño,
  texto,
  textoEstado,
  imagenURL,
  textoBoton,
  onCardClick,
  isLoggedIn,
}) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imagenURL} width="100" height="180" />
      <Card.Body>
        <Card.Title>{nombre}</Card.Title>
        <Card.Subtitle>{tipo}</Card.Subtitle>
        <Card.Subtitle>{tamaño}</Card.Subtitle>
        <Card.Text>{texto}</Card.Text>
        <Card.Text>{textoEstado}</Card.Text>
        <OverlayTrigger
          overlay={
            <Tooltip id="tooltip-disabled">
              Por favor inicia sesión
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
          </span>
        </OverlayTrigger>
      </Card.Body>
    </Card>
  );
}

export default PetCard;
