import React, { useContext } from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import { Dropdown, Navbar, Nav, Container } from 'react-bootstrap';

import AuthContext from '../authentication/AuthContext';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

import { useLocation, Link } from 'react-router-dom';

import './NavBar.css'
import logoDark from '../images/logoDark.png';
import logoLight from '../images/logoLight.png';


export const NavBar = ({ toggleDarkMode, darkMode }) => {
    // Tomamos el estado de autenticación del usuario del AuthContext.
    const { isLoggedIn, userEmail } = useContext(AuthContext);
    // Utilizamos el hook useLocation para obtener la ruta actual.
    const location = useLocation();

    return (
        // La barra de navegación principal. Le añadimos la clase dark-mode si darkMode es verdadero.
        <Navbar expand="lg" className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
            <Container fluid>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img
                            src={darkMode ? logoDark : logoLight}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />
                        {' '}Cerca Tuyo</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="me-auto" activeKey={location.pathname}>
                        <LinkContainer to="/">
                            <Nav.Link>Inicio</Nav.Link>
                        </LinkContainer>
                        {/* Renderizamos el enlace "Dar en Adopción" solo si el usuario está autenticado */}
                        {isLoggedIn && (
                            <LinkContainer to="/crear">
                                <Nav.Link>Dar en Adopción</Nav.Link>
                            </LinkContainer>
                        )}
                        <LinkContainer to="/sobre-nosotros">
                            <Nav.Link>Sobre Nosotros</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    {/* Renderizamos diferentes conjuntos de enlaces dependiendo de si el usuario está autenticado o no. */}
                    {isLoggedIn ? (
                        <Nav activeKey={location.pathname}>
                            <LinkContainer to="/mis-publicaciones">
                                <Nav.Link>Mis Publicaciones</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/mis-datos">
                                <Nav.Link>Mis Datos</Nav.Link>
                            </LinkContainer>
                            <Nav.Item>
                                <Dropdown>
                                    <Dropdown.Toggle variant="none" id="dropdown-basic">
                                        {userEmail}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item><Link to="/logout">Cerrar Sesión</Link></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav.Item>
                        </Nav>
                    ) : (
                        <Nav activeKey={location.pathname}>
                            <LinkContainer to="/login">
                                <Nav.Link>Iniciar sesion</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/registro">
                                <Nav.Link>Registrame</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    )}
                    {/* La sección de cambiar el modo oscuro o claro de la aplicación */}
                    <Nav>
                        <Nav.Item>
                            <button type="button" className="btn toggle-mode" onClick={toggleDarkMode}>
                                {/* El ícono cambia dependiendo de si estamos en modo oscuro o claro */}
                                <FontAwesomeIcon className={darkMode ? "icon-sun-dark" : ""} icon={darkMode ? faSun : faMoon} />
                            </button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
