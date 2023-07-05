import React, { useContext, useState } from 'react';
import AuthContext from '../authentication/AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth, signOut } from '../firebaseConfig/firebaseConfig'
import "./Logout.css"
// '../firebaseConfig/firebaseConfig';

export const Logout = ({ darkMode }) => {
    
    const [error, setError] = useState("");
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

  

    const handleLogout = () => {
        signOut(auth)
        .then(() => {
            // El usuario ha cerrado la sesión
            authContext.onLogout();
            authContext.userEmail="";
            navigate('/');
        })
        .catch((error) => {
            // Hubo un error al iniciar sesión
            setError("Hubo un error al cerrar la sesión. Por favor, intenta de nuevo.");
            console.log(error);
        });
    };

    return (
        
        <div className={`container log mt-3 ${darkMode ? 'dark-mode' : ''}`}>
            <h2 className='mt-3'>¿Deseas cerrar sesión?</h2>
            {error && <p>{error}</p>}
            <button className='btn btn-secondary mt-3 mb-3' onClick={handleLogout}>Cerrar sesión</button>
            </div>
    
    );
};

export default Logout;
