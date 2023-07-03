import Persona from "./Persona";

import { useState, useEffect, useContext, useCallback } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Row from "react-bootstrap/Col";
import Col from "react-bootstrap/Col";
import { useNavigate, useParams, Link } from "react-router-dom";


import AuthContext from "../authentication/AuthContext";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebaseConfig/firebaseConfig";

export const Adoptantes = () => {
  const { userEmail } = useContext(AuthContext);
  const { id } = useParams();
  const [adoptants, setAdoptants] = useState([]);
  const adoptantsCollection = collection(db, `pets/${id}/adoptants`);
  const getAdoptants = useCallback(async () => {
    const data = await getDocs(adoptantsCollection);
    const allAdoptants = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
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
    getAdoptants(); //actualiza el componente
  };

  //funcion para mostrar los datos del adoptante
  const handleOnDataClick = async (adoptante) => {
    //todo
    



  };

  useEffect(() => {
    getAdoptants();
  }, []);

  return (
    <>
      <div className="pet-grid d-flex flex-wrap justify-content-center">
      <ListGroup>
            
        {adoptants.map((adoptant) => (
          <div key={adoptant.id}>
              <ListGroupItem header="Email">
                <Row>
                  <Col >
                    {adoptant.usuario}
                  </Col>
                  <Col>
                    <Link className="nav-link" to={`/persona/${adoptant.usuario}`}>Datos del adoptante</Link>
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      onClick={() => handleOnAdoptantClick(adoptant.usuario)}>
                      Seleccionar
                    </Button>
                  </Col>
                </Row>
            </ListGroupItem>
            
          </div>
        ))}
                </ListGroup>
        
      </div>
    </>
  );
};

export default Adoptantes;