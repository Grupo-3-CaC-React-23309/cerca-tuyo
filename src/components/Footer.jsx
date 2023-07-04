import './Footer.css'
import { Link } from 'react-router-dom';


export const Footer = ({ darkMode }) => {
  return (
  <footer className={`footer ${darkMode ? 'dark-mode' : ''}`}>
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h5>Enlaces</h5>
          <ul className="list-unstyled justify-content-between">
            <li><Link className="nav-link" to="/">Inicio</Link></li>
            <li><Link className="nav-link" to="/sobre-nosotros">Sobre Nosotros</Link></li>
            <li><Link className="nav-link" to="/registro">Registrarse</Link></li>
            <li><Link className="nav-link" to="/login">Login</Link></li>
          </ul>
        </div>
        <div className="col-md-4">
          <h5>Redes Sociales</h5>
          <ul className="list-unstyled social-icons">
            <li><Link className="fa-brands fa-square-facebook fa-lg" to="#"></Link></li>
            <li><Link className="fa-brands fa-square-twitter fa-lg" to="#"></Link></li>
            <li><Link className="fa-brands fa-instagram fa-lg" to="#"></Link></li>
            <li><Link className="fa-brands fa-linkedin fa-xl" to="#"></Link></li>
          </ul>
        </div>
        <div className="col-md-4">
          <h5>Contacto</h5>
          <ul className="list-unstyled justify-content-between">
            <li><Link className="mailito: cercatuyobsas@gmail.com" to="#">cercatuyobsas@gmail.com</Link></li>
      
            <li>Dirección de la oficina</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
    );
}
