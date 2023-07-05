import { useState, useEffect, useContext, useCallback } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";

import { useParams } from "react-router-dom";

import AuthContext from "../authentication/AuthContext";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebaseConfig/firebaseConfig";

import "./Adoptantes.css";

export const Adoptantes = () => {
  // Utiliza los hooks useContext, useState y useParams para acceder a la información de usuario, estado de la aplicación y parámetros de ruta, respectivamente
  const { userEmail } = useContext(AuthContext);
  const { id } = useParams();
  const [adoptants, setAdoptants] = useState([]);
  const [adoptanteSeleccionado, setAdoptanteSeleccionado] = useState("");
  const [isAdoptantSelected, setIsAdoptantSelected] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAdoptant, setSelectedAdoptant] = useState(null);
  const [detailedAdoptant, setDetailedAdoptant] = useState(null);

  const adoptantsCollection = collection(db, `pets/${id}/adoptants`);

  // Define una función asíncrona que recupera la información del adoptante de la mascota actual
  const getAdoptante = async () => {
    const petData = await getDoc(doc(db, "pets", id));
    const adoptante = petData.data().adoptante;
    // Establece el adoptante seleccionado y si hay un adoptante seleccionado
    setAdoptanteSeleccionado(adoptante);
    // Si ya hay un adoptante, se habilita el botón "Revertir selección"
    if (adoptante) {
      setIsAdoptantSelected(true);
    }
    // Si ya esta entregada la mascota
    if (petData.data().estado===800) {
      setIsDelivered(true);
    }
    
  };

  const getAdoptants = useCallback(async () => {
    // Obtiene los datos de los adoptantes y los mapea a un objeto
    const data = await getDocs(adoptantsCollection);
    const allAdoptants = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    // Establece la lista de adoptantes
    setAdoptants(allAdoptants);
  }, [adoptantsCollection]);

  //funcion para seleccionar el adoptante
  const handleOnAdoptantClick = async (adoptante) => {
    const pet = doc(db, "pets", id);
    const petData = await getDoc(doc(db, "pets", id));
    // si no está entregado se puede modificar el adoptante
    if (userEmail === petData.data().usuario && petData.data().estado < 800) {
      await updateDoc(pet, {
        estado: 500,
        adoptante: adoptante,
        timestamp: serverTimestamp(),
      }); //actualiza el estado a adoptado y agrega el campo del adoptante
    }
    setAdoptanteSeleccionado(adoptante);
    setIsAdoptantSelected(true);
    getAdoptants(); //actualiza el componente
  };

  //funcion para entregar la mascota
  const handleOnDeliveredClick = async (adoptante) => {
    const pet = doc(db, "pets", id);
    const petData = await getDoc(doc(db, "pets", id));
    // si no está entregado se puede modificar el adoptante
    if (
      userEmail === petData.data().usuario &&
      petData.data().estado === 500 &&
      petData.data().adoptante === adoptante
    ) {
      await updateDoc(pet, {
        estado: 800, //actualiza el estado a entregado
        timestamp: serverTimestamp(),
      });
    }
    setAdoptanteSeleccionado(adoptante);
    setIsAdoptantSelected(true);
    setIsDelivered(true);
    getAdoptants(); //actualiza el componente
  };

  const handleOnRevertSelectionClick = async () => {
    const pet = doc(db, "pets", id);
    const petData = await getDoc(doc(db, "pets", id));
    if (userEmail === petData.data().usuario && petData.data().estado < 800) {
      await updateDoc(pet, {
        adoptante: "", // quita el adoptante
        timestamp: serverTimestamp(),
      });
    }
    setAdoptanteSeleccionado("");
    setIsAdoptantSelected(false);
    getAdoptants(); //actualiza el componente
  };

  const [showRejectAllModal, setShowRejectAllModal] = useState(false);

  const handleOnRejectAllClick = async () => {
    setShowRejectAllModal(true);
  };

  const handleRejectAllConfirm = async () => {
    const pet = doc(db, "pets", id);
    const petData = await getDoc(doc(db, "pets", id));
    if (userEmail === petData.data().usuario && petData.data().estado < 800) {
      await updateDoc(pet, {
        estado: 20, // actualiza el estado a: en adopción con pedidos
        adoptante: "", // quita el adoptante
        timestamp: serverTimestamp(),
      });
    }
    setAdoptanteSeleccionado("");
    setIsAdoptantSelected(false);
    getAdoptants(); //actualiza el componente
    setShowRejectAllModal(false);
  };

  const handleShowMoreInfo = async (adoptant) => {
    setSelectedAdoptant(adoptant);
    await getUserData(adoptant.usuario); // Get additional data
    setShowModal(true);
  };

  // Define una función para obtener los datos del usuario
  const getUserData = async (email) => {
    // Crea una consulta para obtener el usuario con el correo electrónico proporcionado
    const q = query(collection(db, "personas"), where("user", "==", email));
    const querySnapshot = await getDocs(q);
    // Si se encuentra el usuario, establece los detalles del adoptante
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0].data();
      setDetailedAdoptant(data);
    }
  };

  useEffect(() => {
    getAdoptants();
    getAdoptante();
  }, []);

  return (
    <>
      <div className="pet-grid d-flex flex-wrap justify-content-center">
        <Container>
          <Button
            className="mb-3"
            variant="warning"
            onClick={handleOnRejectAllClick}
            disabled={isAdoptantSelected}
          >
            Descartar todos los adoptantes
          </Button>
          <ListGroup>
            {adoptants.map((adoptant) => (
              <div key={adoptant.id}>
                <ListGroupItem header="Email">
                  {adoptant.usuario === adoptanteSeleccionado ? (
                    <span className="selected-text">Seleccionado</span>
                  ) : (
                    <span className="not-selected-text">No Seleccionado</span>
                  )}
                  <Row>
                    <Col>{adoptant.usuario}</Col>
                    <Col>
                      <Button
                        variant="secondary"
                        onClick={() => handleShowMoreInfo(adoptant)}
                      >
                        Datos del adoptante
                      </Button>
                    </Col>
                    <Col>
                      {!isDelivered ? (adoptant.usuario === adoptanteSeleccionado ? (
                        <>
                          <Button
                            variant="danger"
                            onClick={handleOnRevertSelectionClick}
                            disabled={!isAdoptantSelected}
                          >
                            Revertir selección
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() =>
                              handleOnDeliveredClick(adoptant.usuario)
                            }
                            disabled={!isAdoptantSelected}
                          >
                            Entregado
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() =>
                            handleOnAdoptantClick(adoptant.usuario)
                          }
                          disabled={isAdoptantSelected}
                        >
                          Seleccionar adoptante
                        </Button>
                      )):("Entregado")}
                    </Col>
                  </Row>
                </ListGroupItem>
              </div>
            ))}
          </ListGroup>
        </Container>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Datos del adoptante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAdoptant && detailedAdoptant && (
            <>
              <p>Email: {selectedAdoptant.usuario}</p>
              <p>Nombre: {detailedAdoptant.nombre}</p>
              <p>Apellido: {detailedAdoptant.apellido}</p>
              <p>Domicilio: {detailedAdoptant.domicilio}</p>
              <p>Localidad: {detailedAdoptant.localidad}</p>
              <p>Código Postal: {detailedAdoptant.codigoPostal}</p>
              <p>Tipo de vivienda: {detailedAdoptant.vivienda}</p>
              <p>Condición: {detailedAdoptant.condicion}</p>
              <p>Convivientes: {detailedAdoptant.convivientes}</p>
              <p>Otras mascotas: {detailedAdoptant.otrasMascotas}</p>
              <p>Vacaciones: {detailedAdoptant.vacaciones}</p>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showRejectAllModal}
        onHide={() => setShowRejectAllModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            ¿Estás seguro de que deseas descartar a todos los adoptantes y poner
            la mascota de nuevo en adopción?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowRejectAllModal(false)}
          >
            Cancelar
          </Button>
          <Button variant="warning" onClick={handleRejectAllConfirm}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Adoptantes;
