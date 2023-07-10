import React, { useContext, useState } from 'react';
import AuthContext from '../authentication/AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from '../firebaseConfig/firebaseConfig';
import "./Register.css"

export const Register = ({ darkMode }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        // Comprobando la longitud de la contraseña y si contiene al menos un número
        if(password.length < 6 || !/\d/.test(password)) {
            setError("La contraseña debe tener al menos 6 caracteres y contener al menos un número.");
            return;
        }

        createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // El usuario se ha registrado y está logueado
            const userEmail = userCredential.user.email; // Get the user's email
            authContext.onLogin(userEmail);
            navigate('/');
        })
        .catch((error) => {
            // Hubo un error al crear la cuenta
            setError("Error al crear la cuenta. Por favor, inténtalo de nuevo.");
            console.log(error);
        });
    };

    return (
        <div className={`container registro ${darkMode ? 'dark-mode' : ''}`}>
            <div className='row'>
                <div className='col mt-4'>
                <h2>Registro</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleRegister}>
                <div className='mb-4 mt-4'>
                
                <input type="text" placeholder="Email" className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='mb-4'>
                <input type="password" placeholder="Contraseña" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className=' mb-4'>
                <button type="submit" className='btn btn-secondary'>Registrarse</button>
                </div>
                
            </form>
                </div>
            
            </div>
           
        </div>
    );
};

export default Register;
