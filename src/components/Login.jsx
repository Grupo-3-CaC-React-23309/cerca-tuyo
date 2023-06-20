import React, { useContext, useState } from 'react';
import AuthContext from '../authentication/AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, sendPasswordResetEmail } from '../firebaseConfig/firebaseConfig'

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
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <input type="text" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Iniciar sesión</button>
            <button onClick={handlePasswordReset}>Olvidé mi contraseña</button>
        </div>
    );
};

export default Login;
