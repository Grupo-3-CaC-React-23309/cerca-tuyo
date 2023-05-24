import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function PetCard({
  nombre,
  tipo,
  tamaño,
  texto,
  textoEstado,
  imagenURL,
  textoBoton,
  onCardClick,
}) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imagenURL} width="100" height="180" />
      <Card.Body>
        <Card.Title>{nombre}</Card.Title>
        <Card.Subtitle>{tipo}</Card.Subtitle>
        <Card.Subtitle>{tamaño}</Card.Subtitle>
        <Card.Text>{texto}</Card.Text>
        <Card.Text>{textoEstado}</Card.Text>
        <Button variant="primary" onClick={onCardClick}>
          {textoBoton}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PetCard;
