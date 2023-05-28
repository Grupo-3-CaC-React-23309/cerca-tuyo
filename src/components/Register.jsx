import React, { useContext, useState } from 'react';
import AuthContext from '../authentication/AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from '../firebase/firebase';

export const Register = () => {
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
            authContext.onLogin();
            navigate('/');
        })
        .catch((error) => {
            // Hubo un error al crear la cuenta
            setError("Error al crear la cuenta. Por favor, inténtalo de nuevo.");
            console.log(error);
        });
    };

    return (
        <div>
            <h2>Registro</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
