import PetCard from "./PetCard";

import { useState, useEffect } from "react";

//import {Link} from "react-router-dom"
//import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebaseconfig/frebaseConfig";


//"../firebaseConfig/firebase.js";

//import Swal from "sweetalert2"
//import whitReactContent from "sweetalert2-react-content"
//const mySwal = whitReactContent (Swal)

export const PetGrid = () => {
  //1 configurar useState (hook)
  const [pets, setPets] = useState([]);
  //2 referenciamos a la db de firestore
  const petsCollection = collection(db, "pets");
  //3 funcion para mostrar todos los docs
  const getPets = async () => {
    const data = await getDocs(petsCollection);
    setPets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleOnCardClick = async (id, estadoActual) => {
    const pet = doc(db, "pets", id);
    
      await updateDoc(pet, {estado:!estadoActual});
      getPets();
   };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <>
      <div className="row align-items-start">
        {pets.map((pet) => (
          <div className="col" key={pet.id}>
            <PetCard
              imagenURL={pet.imagenURL}
              nombre={pet.nombre}
              tipo={pet.tipo}
              tamaño={pet.tamaño}
              texto={pet.texto}
              textoEstado={pet.estado ? "Adoptado" : "Te espera"}
              textoBoton={
                pet.estado ? "Abandonar" : "Adoptar"
              }
              onCardClick={() => handleOnCardClick(pet.id,pet.estado)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default PetGrid;
