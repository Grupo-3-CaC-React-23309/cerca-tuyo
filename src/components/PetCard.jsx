import { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../authentication/AuthContext";
import {
  collection,
  getDocs,
  query,
  doc,
  deleteDoc,
  setDoc,
  where,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebaseConfig";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
  estado,
  onCardClick,
  onDeleteClick,
}) => {
  const { isLoggedIn, userEmail } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);

  const isOwner = userEmail === usuario;
  const [datosCargados, setDatosCargados] = useState(false);

  //funcion para verificar que el adoptante haya completado los datos
  const checkIfDataExists = async () => {
    if (isLoggedIn) {
      const q = query(
        collection(db, "personas"),
        where("user", "==", userEmail)
      );
      const querySnapshot = await getDocs(q);
      console.log(userEmail);
      console.log(!querySnapshot.empty);
      setDatosCargados(!querySnapshot.empty);
    }
  };

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/editar/${petId}`);
  };

  const handleSelectAdoptants = () => {
    navigate(`/adoptantes/${petId}`);
  };

  const isPreAdoptado = async (PetId, Usuario) => {
    if (isLoggedIn) {
      const adoptantRef = doc(db, `pets/${PetId}/adoptants`, Usuario);
      const adoptantSnapshot = await getDoc(adoptantRef);
      return adoptantSnapshot.exists();
    }
    return false;
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
    const petRef = doc(db, "pets", petId);
    // crea una sub coleccion (adoptants) de pre-adoptantes
    if ((estado < 500) && datosCargados) {
      await Swal.fire({
        title: "Esta seguro de postularse para adoptar esta mascota?",
        text: "Por favor piense en la responsabilidad que esto impica.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, lo quiero!",
      }).then((result) => {
        if (result.isConfirmed) {
          setDoc(adoptantRef, { usuario: userEmail, petId: petId }); //agrega el adoptante a la subcoleccion
          updateDoc(petRef, { estado: 20 }); // Cambia el estado de la mascota a 'Pedido'
          setPreAdoptado(true);

          Swal.fire(
            "Estas postulado!",
            "El administrador se contactará con vos para mas info.",
            "success"
          );
        }
      })
    } 
    else {
      Swal.fire("Debes completar tus datos para poder adoptar");
    }
  };

  const handleUnadopt = async () => {
    const adoptantRef = doc(db, `pets/${petId}/adoptants/${userEmail}`);
    const petRef = doc(db, "pets", petId);

    await Swal.fire({
      title: "Esta arrepentido de postularse para adoptar esta mascota?",
      //text: ".",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrarme del listado",
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar el documento del adoptante
        deleteDoc(adoptantRef);

        // Verificar si existen otros adoptantes
        const adoptantsQuery = query(collection(db, `pets/${petId}/adoptants`));
        const adoptantsSnapshot = getDocs(adoptantsQuery);

        // Si no hay otros adoptantes, actualizar el estado de la mascota
        if (adoptantsSnapshot.empty) {
          updateDoc(petRef, { estado: 10 }); // Cambia el número a tu código correspondiente para 'No adoptado'
        }

        setPreAdoptado(false);

        Swal.fire(
          "Has sido borrado de la lista de postulantes.",
          "Si lo deseas, puedes volver a postularte",
          "success"
        );
      }
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      isPreAdoptado(petId, userEmail).then((result) => {
        setPreAdoptado(result);
      });
      checkIfDataExists();
    }
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
          {isLoggedIn && (
            <span className="d-inline-block">
              {isOwner && estado < 20 && (
                <>
                  <Button variant="info" className="me-3" onClick={handleEdit}>
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    className="me-2"
                    onClick={deleteClose}
                  >
                    Eliminar
                  </Button>
                </>
              )}
              {isOwner && estado >= 20 && estado < 800 && (
                <>
                  <Button variant="info" className="me-3" onClick={handleEdit}>
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    className="me-3"
                    onClick={deleteClose}
                  >
                    Eliminar
                  </Button>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={handleSelectAdoptants}
                  >
                    Seleccionar Adoptantes
                  </Button>
                </>
              )}

              {isOwner && estado == 800 && (
                <>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={handleSelectAdoptants}
                  >
                    Adoptantes
                  </Button>
                </>
              )}

              {
                // Solo muestra los botones si el usuario no es el propietario y el estado de la mascota es menor a 800
                !isOwner && estado < 800 && (
                  <>
                    {
                      // Si la mascota no ha sido preadoptada, muestra el botón de "Adoptar"
                      !preAdoptado ? (
                        <Button variant="primary" onClick={handleAdopt}>
                          {"Adoptar"}
                        </Button>
                      ) : (
                        // Si la mascota ha sido preadoptada, muestra el botón de "Ya no me interesa"
                        <Button variant="danger" onClick={handleUnadopt}>
                          Ya no me interesa 😢
                        </Button>
                      )
                    }
                  </>
                )
              }
            </span>
          )}
          {!isLoggedIn && (
            <OverlayTrigger
              overlay={
                <Tooltip id="tooltip-disabled">Por favor inicia sesión</Tooltip>
              }
            >
              <span className="d-inline-block">
                <Button
                  variant="primary"
                  disabled
                  style={{ pointerEvents: "none" }}
                  className="ms-3"
                >
                  {"Adoptar"}
                </Button>
              </span>
            </OverlayTrigger>
          )}
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PetCard;
