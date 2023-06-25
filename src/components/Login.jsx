import React, { useContext, useState } from 'react';
import AuthContext from '../authentication/AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, sendPasswordResetEmail } from '../firebaseConfig/firebaseConfig'
import "./Login.css"
// '../firebaseConfig/firebaseConfig';

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // El usuario ha iniciado sesión
            authContext.onLogin(userCredential.user.email);
            navigate('/');
        })
        .catch((error) => {
            // Hubo un error al iniciar sesión
            setError("Hubo un error al iniciar sesión. Por favor, intenta de nuevo.");
            console.log(error);
        });
    };

    const handlePasswordReset = () => {
        sendPasswordResetEmail(auth, username)
        .then(() => {
            // Correo electrónico de restablecimiento de contraseña enviado
            alert("Correo electrónico de restablecimiento de contraseña enviado.");
        })
        .catch((error) => {
            // Hubo un error al enviar el correo electrónico de restablecimiento de contraseña
            setError("Error al enviar el correo electrónico de restablecimiento de contraseña.");
            console.log(error);
        });
    };

    return (
        <div className='container iniSesion'>
            <div className='row'>
            <div className='col mt-4'>
            <h2>Iniciar sesion</h2>
            {error && <p>{error}</p>}
            <div className='mb-4 mt-4'>
            <input type="text" placeholder="Email" className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className='mb-4'>
            <input type="password" placeholder="Contraseña" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='row mb-4 '>
                <div className='col ' >
                <button onClick={handleLogin} className='btn btn-secondary m-3'>Iniciar sesión</button>
                <button onClick={handlePasswordReset} className='btn btn-secondary'>Olvidé mi contraseña</button>
                </div>
            
            </div>
            
            </div>
            </div>
            
        </div>
    );
};

export default Login;
