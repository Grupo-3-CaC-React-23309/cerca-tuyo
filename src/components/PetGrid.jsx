import PetCard from "./PetCard";

import { useState, useEffect, useCallback } from "react";

import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

import { db } from '../firebaseConfig/firebaseConfig' //   "../firebaseConfig/firebaseConfig"
import './PetGrid.css'

//import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";


//import Swal from "sweetalert2"
//import whitReactContent from "sweetalert2-react-content"
//const mySwal = whitReactContent (Swal)

export const PetGrid = () => {
  
  //1 configurar useState (hook)
  const [pets, setPets] = useState([]);
  //2 referenciamos a la db de firestore
  const petsCollection = collection(db, "pets");
  //3 funcion para mostrar todos los docs
  const getPets = useCallback(async () => {
      const data = await getDocs(petsCollection);
      setPets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }, [petsCollection]);

  const handleOnCardClick = async (id, estadoActual) => {
    const pet = doc(db, "pets", id);
    await updateDoc(pet, { estado: !estadoActual });
    getPets();    //actualiza el componenete   
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
