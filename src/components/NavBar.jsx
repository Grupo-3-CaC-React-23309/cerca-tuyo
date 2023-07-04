import React, { useContext } from 'react';
// Importación de los componentes necesarios de react-router-bootstrap y react-bootstrap.
import { LinkContainer } from 'react-router-bootstrap';
import { Dropdown, Navbar, Nav, Container } from 'react-bootstrap';
// Importamos el contexto de autenticación para usar el estado del usuario en la barra de navegación.
import AuthContext from '../authentication/AuthContext';

// Importamos los íconos que vamos a usar en el modo oscuro/botón de luz.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
// Importamos el hook useLocation de react-router-dom para determinar la página activa actual.
import { useLocation } from 'react-router-dom';

// Importamos nuestros estilos personalizados para la barra de navegación.
import './NavBar.css'

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
                    <Navbar.Brand>Cerca Tuyo</Navbar.Brand>
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
                                        <Dropdown.Item href="/logout">Cerrar Sesión</Dropdown.Item>
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
