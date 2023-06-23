import PetCard from "./PetCard";

import { useState, useEffect, useContext, useCallback } from "react";

import AuthContext from '../authentication/AuthContext';
import { useNavigate } from 'react-router-dom';

import { collection, getDocs,query, where, getDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

import { db } from '../firebaseConfig/firebaseConfig' //   "../firebaseConfig/firebaseConfig"
import './PetGrid.css'

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

    const handleOnCardClick = async (id, estadoActual) => {
      const pet = doc(db, "pets", id);
      const petData = await getDoc(doc(db, "pets", id));
     
      if (userEmail === petData.data().usuario) {
        navigate(`/editar/${pet.id}`);
      } else {
        await updateDoc(pet, { estado: !estadoActual });  //actualiza cambiando el estado de la mascota
        getPets();  //para actualizar la vista  
      }       
    };

    const handleOnDeleteClick = async (id) => {
      const pet = doc(db, "pets", id);
      await deleteDoc(pet);  // borra el documento
      getPets();  //para actualizar la vista
    };
    
useEffect(() => {
    getPets();
  }, []);

  return (
    <>
      <div className="pet-grid d-flex flex-wrap justify-content-center">
        {pets.map((pet) => (
          <div key={pet.id} style={{ width: 'fit-content', margin: '0.5em' }}>
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
              textoEstado={pet.estado ? "Adoptado" : "Te espera"}
              textoBoton="Editar"  //dentro de MisPublicaciones solo se puede editar, NO adoptar
              
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
