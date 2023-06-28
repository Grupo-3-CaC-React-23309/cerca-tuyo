import PetCard from "./PetCard";

import { useState, useEffect, useContext, useCallback } from "react";

import AuthContext from '../authentication/AuthContext';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

import { db } from '../firebaseConfig/firebaseConfig' //   "../firebaseConfig/firebaseConfig"
import './PetGrid.css'

//import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";


//import Swal from "sweetalert2"
//import whitReactContent from "sweetalert2-react-content"
//const mySwal = whitReactContent (Swal)

export const PetGrid = () => {
  const { userEmail } = useContext(AuthContext);
  
  const [pets, setPets] = useState([]);
  const petsCollection = collection(db, "pets");
  const getPets = useCallback(async () => {
    const data = await getDocs(petsCollection);
    const allPets = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    // Si el usuario está logueado, filtra sus publicaciones
    if (userEmail) {
      const filteredPets = allPets.filter(pet => pet.usuario !== userEmail);
      setPets(filteredPets);
    } else {
      setPets(allPets);
    }
  }, [petsCollection, userEmail]);

  const handleOnCardClick = async (id, estadoActual) => {
    const pet = doc(db, "pets", id);
    await updateDoc(pet, { estado: !estadoActual });
    getPets();    //actualiza el componente   
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
              textoEstado={pet.estado ? "Adoptado" : "Te espera"}
              textoBoton={pet.estado ? "Abandonar" : "Adoptar"}
              onCardClick={() => handleOnCardClick(pet.id, pet.estado)}
            />
          </div>
        ))}
      </div>

    </>
  );
};

export default PetGrid;
