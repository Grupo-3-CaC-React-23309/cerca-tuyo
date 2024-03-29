import PetCard from "./PetCard";

import { useState, useEffect, useContext, useCallback } from "react";

import AuthContext from "../authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebaseConfig/firebaseConfig";
import "./PetGrid.css";

export const MisPublicaciones = () => {
  const { userEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  //1 configurar useState (hook)
  const [pets, setPets] = useState([]);
  //2 referenciamos a la db de firestore
  const petsCollection = collection(db, "pets");
  //3 funcion para mostrar solo los docs del usuario (userEmail)
  const getPets = useCallback(async () => {
    const q = query(petsCollection, where("usuario", "==", userEmail));
    const data = await getDocs(q);
    setPets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }, [petsCollection]);

  const handleOnCardClick = async (id) => {
    const pet = doc(db, "pets", id);
    const petData = await getDoc(doc(db, "pets", id));

    if (userEmail === petData.data().usuario && petData.data().estado < 20) {
      navigate(`/editar/${pet.id}`);
    } else {
      //tiene pedidos de adopcion
      navigate(`/adoptantes/${pet.id}`);
    }
  };

  // funcion para eliminar a la mascota de la coleccio "pets"
  const handleOnDeleteClick = async (id) => {
    const pet = doc(db, "pets", id);
    const petData = await getDoc(doc(db, "pets", id));

    if (userEmail === petData.data().usuario && petData.data().estado < 800) {
      await Swal.fire({
        title: "Esta seguro?",
        text: "No va a poder revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar mascota!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteDoc(pet); // elimina la mascota... del listado :)

          Swal.fire(
            "Borrada!",
            "Su mascota ha sido eliminada del listado.",
            "success"
          );
          getPets(); //para actualizar la vista
        }
      });
    }
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <>
      <div className="pet-grid d-flex flex-wrap justify-content-center">
        {pets.map((pet) => (
          <div key={pet.id} style={{ width: "fit-content", margin: "0.5em" }}>
            <PetCard
              imagenURL={pet.imagenURL}
              nombre={pet.nombre}
              tipo={pet.tipo}
              tamaño={pet.tamaño}
              sexo={pet.sexo}
              peso={pet.peso}
              edadCantidad={pet.edadCantidad}
              edadUnidad={pet.edadUnidad}
              texto={pet.texto}
              usuario={pet.usuario}
              petId={pet.id}
              estado={pet.estado}
              textoEstado={
                pet.estado < 20
                  ? "Podes Editar y/o Eliminar"
                  : pet.estado < 500
                  ? "Tiene pedidos de adopcion"
                  : pet.estado < 800
                  ? "Asignado"
                  : "Entregado"
              }
              textoBoton={
                pet.estado < 20
                  ? "Editar"
                  : pet.estado < 800
                  ? "Seleccionar adoptante"
                  : "No se puede modificar"
              } //dentro de MisPublicaciones solo se puede editar, NO adoptar
              onCardClick={() => handleOnCardClick(pet.id, pet.estado)}
              onDeleteClick={() => handleOnDeleteClick(pet.id)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MisPublicaciones;
