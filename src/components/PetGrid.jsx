import PetCard from "./PetCard";

import { useState, useEffect, useContext, useCallback } from "react";

import AuthContext from "../authentication/AuthContext";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebaseConfig/firebaseConfig";
import "./PetGrid.css";
/*

Estados de la mascota:

    10 = mascota en adopcion
    20 = mascota con pedido de adopcion
    500 = mascota adoptada  (luego de que el usuario creador acepte el pedido)
    800 = mascota entregada    
    999 = mascota dada de baja (solo el usuario creador puede hacerlo siempre que no este adoptada)

*/

export const PetGrid = () => {
  const { isLoggedIn, userEmail } = useContext(AuthContext);

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
        (pet) => pet.usuario !== userEmail && pet.estado < 500
      );
      setPets(filteredPets);
    } else {
      const filteredPets = allPets.filter((pet) => pet.estado < 500);
      setPets(filteredPets);
    }
  }, [petsCollection, userEmail]);

  //funcion para verificar que el adoptante haya completado los datos
  const datosCargados = async () => {
    if (isLoggedIn) {
      const q = query(collection(db, "personas"), where("user", "==", userEmail));
      const querySnapshot = await getDocs(q);
      console.log(userEmail);
      return (!querySnapshot.empty) 
    }
  };
  
  //funcion para postularse para adoptar
  const handleOnCardClick = async (idPet, estadoActual) => {
    // crea una sub coleccion (adoptants) de pre-adoptantes
    if ((estadoActual < 500) && datosCargados) {
      const adoptantRef = doc(collection(db, "pets", idPet, "adoptants"));
      await setDoc(adoptantRef, {
        id: adoptantRef.id,
        usuario: userEmail,
        timestamp: serverTimestamp(),
      });
      const pet = doc(db, "pets", idPet);
      await updateDoc(pet, { estado: 20, timestamp: serverTimestamp() }); //actualiza el estado a pre-adoptado
      getPets(); //actualiza el componente
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
              usuario={pet.usuario}
              petId={pet.id}
              edadCantidad={pet.edadCantidad}
              edadUnidad={pet.edadUnidad}
              texto={pet.texto}
              estado={pet.estado}
              textoEstado={pet.estado < 500 ? "Te espera" : "Adoptada"}
              textoBoton={pet.estado < 500 ? "Adoptar" : ""}
              onCardClick={() => handleOnCardClick(pet.id, pet.estado)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default PetGrid;
