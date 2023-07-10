import './SobreNosotros.css'

export const SobreNosotros = ()=>{
    return(
        <div className="container">
        <h2 className="mt-4 mb-4 mx-auto text-center">Sobre Nosotros</h2>
        <div className="row">
          <div className="col-md-6 mt-3 mb-4">
            <img src="https://w0.peakpx.com/wallpaper/977/291/HD-wallpaper-aussie-family-australian-shepherd-running-dogs-pets-dogs-australian-shepherd-dog-aussie-dog.jpg" alt="Company" className="img-fluid" />
          </div>
          <div className="col-md-5 mb-4 mt-3">
            <h4>Nuestra Historia</h4>
            <p className="mt-3">Hace algunos meses atrás, un grupo de compañeros decidió crear una página cuya utilidad fuese oportuna para los tiempos que actualmente se viven. A partir de ahí surgió la idea de crear “Cerca Tuyo", una herramienta para aquellos que busquen algún servicio lindero a su ubicación geográfica. Pero ¿existe algún servicio altamente recurrente en la actualidad que aún no cuente con un lugar que los reúna a todos? Dimos varias vueltas a la idea, hasta que uno de nosotros pensó en la idea de crear un sitio en donde se puedan publicar la adopción consciente de mascotas. ¿Cuántas veces te encontraste en la situación de encontrar una mascota y no saber que hacer con ella, dado que no podés adoptarla? </p>
          </div>
          <div className="col-md-5 mb-4 mt-3">
            <h4>Nuestra Misión</h4>
            <p className="mt-4">A partir de allí, surgió esta idea: crear un sitio donde todos podemos publicar y adoptar distintas mascotas según el radio de nuestra Geolocalización. Por ello, nuestra misión es poder ayudar tanto a las diferentes mascotas a encontrar un hogar cálido como a aquellos que estén buscan una mascota de compañía en el radio de la provincia de Buenos Aires. </p>
            <h4>Nuestra Visión</h4>
            <p className="mt-4">Nuestra visión es poder brindar satisfactoriamente dicho servicio, sin ningún tipo de contraprestación, a lo largo de los años con un alcance Nacional. </p>
          </div>
          <div className="col-md-6 mt-3 mb-4">
            <img src="https://img.freepik.com/fotos-premium/ninos-aprenden-cuidar-amar-duenos-mascotas_290431-26729.jpg" alt="Company" className="img-fluid" />
          </div>
        </div>
      </div>
    );
}
export default SobreNosotros;