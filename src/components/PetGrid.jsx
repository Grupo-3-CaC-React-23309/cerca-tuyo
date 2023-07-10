import PetCard from "./PetCard";

import { useState, useEffect, useContext, useCallback } from "react";

import AuthContext from "../authentication/AuthContext";
import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebaseConfig/firebaseConfig";
import "./PetGrid.css";
/*

Estados de la mascota:

    10 = mascota en adopcion
    20 = mascota con pedido de adopcion
    500 = mascota asignada  (el usuario creador asigna la mascota a un postulante)
    800 = mascota entregada    
    999 = mascota dada de baja (solo el usuario creador puede hacerlo siempre que no este adoptada)

*/

export const PetGrid = () => {
  const { userEmail } = useContext(AuthContext);

  //1 configurar useState (hook)
  const [pets, setPets] = useState([]);
  //2 referenciamos a la db de firestore
  const petsCollection = collection(db, "pets");

  //3 funcion para mostrar todos los docs
  const getPets = useCallback(async () => {
    const data = await getDocs(petsCollection);
    const allPets = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    // Si el usuario está logueado, filtra sus publicaciones
    if (userEmail) {
      const filteredPets = allPets.filter(
        (pet) => pet.usuario !== userEmail && pet.estado < 800
      );
      setPets(filteredPets);
    } else {
      const filteredPets = allPets.filter((pet) => pet.estado < 800);
      setPets(filteredPets);
    }
  }, [petsCollection, userEmail]);

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
              usuario={pet.usuario}
              petId={pet.id}
              edadCantidad={pet.edadCantidad}
              edadUnidad={pet.edadUnidad}
              texto={pet.texto}
              estado={pet.estado}
              textoEstado={pet.estado < 800 ? "Te espera" : "Adoptada"}
              textoBoton={pet.estado < 800 ? "Adoptar" : ""}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default PetGrid;
