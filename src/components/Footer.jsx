import './Footer.css'
export const Footer =()=> {


return (

<footer className="footer">
<div className="container">
  <div className="row">
    <div className="col-md-4">
      <h5>Enlaces</h5>
      <ul className="list-unstyled justify-content-between">
        <li><a href="/#">Inicio</a></li>
        <li><a href="/sobre-nosotros">Sobre Nosotros</a></li>
        <li><a href="/registro">Registrarse</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </div>
    <div className="col-md-4">
      <h5>Redes Sociales</h5>
      <ul className="list-unstyled justify-content-between">
        <li><a href="#"><i class="fa-brands fa-square-facebook fa-lg"></i></a></li>
        <li><a href="#"><i class="fa-brands fa-square-twitter fa-lg"></i></a></li>
        <li><a href="#"><i class="fa-brands fa-instagram fa-lg"></i></a></li>
        <li><a href="#"><i class="fa-brands fa-linkedin fa-xl"></i></a></li>
      </ul>
    </div>
    <div className="col-md-4">
      <h5>Contacto</h5>
      <ul className="list-unstyled justify-content-between">
        <li><a href="mailto:info@example.com">info@example.com</a></li>
        <li><a href="tel:+1234567890">+1 234 567 890</a></li>
        <li><a href="#">Dirección de la oficina</a></li>
      </ul>
    </div>
  </div>
</div>
</footer>
);
}

export default Footer;
