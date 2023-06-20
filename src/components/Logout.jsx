import React, { useContext, useState } from 'react';
import AuthContext from '../authentication/AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth, signOut } from '../firebaseConfig/firebaseConfig'

// '../firebaseConfig/firebaseConfig';

export const Logout = () => {
    
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
        <div>
            <h2>Logout</h2>
            {error && <p>{error}</p>}
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

export default Logout;
