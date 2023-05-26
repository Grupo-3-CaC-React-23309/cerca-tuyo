import React, { useContext } from 'react';
import AuthContext from '../authentication/AuthContext';
import { useNavigate } from 'react-router-dom';


export const Login = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        authContext.onLogin();
        navigate('/'); // Redirige al usuario a la página principal después de iniciar sesión
    };

    return (
        <div>
            <h2>Login</h2>
            {/* Aquí puedes poner tu formulario de inicio de sesión */}
            <button onClick={handleLogin}>Iniciar sesión</button>
        </div>
    );
};

export default Login;
