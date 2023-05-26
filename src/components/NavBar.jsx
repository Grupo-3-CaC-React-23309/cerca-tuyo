import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import AuthContext from '../authentication/AuthContext'; // Asegúrate de usar tu ruta correcta para importar

export const NavBar = () => {
    const { isLoggedIn } = useContext(AuthContext); // Usar el contexto para obtener el estado de autenticación

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Cerca Tuyo</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        {isLoggedIn && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/dar-en-adopcion">Dar en Adopción</Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link" to="/sobre-nosotros">Sobre Nosotros</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contacto">Contacto</Link>
                        </li>
                    </ul>
                    {isLoggedIn ? (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/mis-publicaciones">Mis Publicaciones</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/mis-datos">Mis Datos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/preferencias">Preferencias</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/logout">Cerrar Sesión</Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
