import { useState, useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebaseConfig/firebaseConfig'
import AuthContext from '../authentication/AuthContext';
import { Button, Form, Container, Row, Col } from "react-bootstrap";

export const Crear = () => {
    const { isLoggedIn, userEmail } = useContext(AuthContext);
    
    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState("");
    const [otroTipo, setOtroTipo] = useState("");
    const [sexo, setSexo] = useState("");
    const [tamaño, setTamaño] = useState("");
    const [peso, setPeso] = useState("");
    const [edadCantidad, setEdadCantidad] = useState("");
    const [edadUnidad, setEdadUnidad] = useState("");
    const [texto, setTexto] = useState("");
    const [imagenURL, setImagenURL] = useState("");
    const [usuario, setUsuario] = useState(userEmail);
    

    const petsCollection = collection(db, "pets");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isLoggedIn) {
            await addDoc(petsCollection, {
                nombre,
                tipo: tipo === "Otro" ? otroTipo : tipo,
                tamaño,
                sexo,
                peso,
                texto,
                imagenURL,
                estado: false, // Asumiendo que las nuevas mascotas no están adoptadas
                edad: `${edadCantidad} ${edadUnidad}`,
                usuario,
            });
            // Limpiar el formulario después de la presentación
            setNombre("");
            setTipo("");
            setTamaño("");
            setPeso("");
            setSexo("");
            setTexto("");
            setImagenURL("");
            setEdadCantidad("");
            setEdadUnidad("");
            setUsuario(userEmail);
        } else {
            alert("Por favor inicia sesión para agregar una mascota");
        }
    };



    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ejemplo: Fido" />
                        </Form.Group>

                        <Form.Group controlId="formTipo" className="mt-3">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                <option>Elegir...</option>
                                <option>Perro</option>
                                <option>Gato</option>
                                <option>Conejo</option>
                                <option>Otro</option>
                            </Form.Select>
                        </Form.Group>

                        {tipo === "Otro" && (
                            <Form.Group controlId="formOtroTipo" className="mt-3">
                                <Form.Label>Escribe el tipo de animal</Form.Label>
                                <Form.Control type="text" value={otroTipo} onChange={(e) => setOtroTipo(e.target.value)} placeholder="Ejemplo: Tortuga" />
                            </Form.Group>
                        )}

                        <Form.Group controlId="formSexo" className="mt-3">
                            <Form.Label>Sexo</Form.Label>
                            <Form.Select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                                <option disabled>Selecciona el sexo...</option>
                                <option>Macho</option>
                                <option>Hembra</option>
                                <option>Desconocido</option>
                            </Form.Select>
                        </Form.Group>


                        <Form.Group controlId="formTamaño" className="mt-3">
                            <Form.Label>Tamaño</Form.Label>
                            <Form.Select value={tamaño} onChange={(e) => setTamaño(e.target.value)}>
                                <option>Elegir...</option>
                                <option>Muy chico</option>
                                <option>Chico</option>
                                <option>Mediano</option>
                                <option>Grande</option>
                                <option>Muy grande</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formEdad" className="mt-3">
                            <Form.Label>Edad</Form.Label>
                            <Col sm={6}>
                                <Form.Select value={edadCantidad} onChange={(e) => setEdadCantidad(e.target.value)}>
                                    <option disabled>Elegir cantidad...</option>
                                    {[...Array(edadUnidad === 'Meses' ? 12 : 100)].map((_, i) => (
                                        <option key={i}>{i + 1}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col sm={6}>
                                <Form.Select value={edadUnidad} onChange={(e) => setEdadUnidad(e.target.value)}>
                                    <option disabled>Elegir unidad...</option>
                                    <option>Meses</option>
                                    <option>Años</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>


                        <Form.Group controlId="formPeso" className="mt-3">
                            <Form.Label>Peso (en kg)</Form.Label>
                            <Form.Control type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Ejemplo: 5.6" />
                        </Form.Group>

                        <Form.Group controlId="formTexto" className="mt-3">
                            <Form.Label>Texto</Form.Label>
                            <Form.Control as="textarea" rows={3} value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Ejemplo: Fido es muy amigable..." />
                        </Form.Group>

                        <Form.Group controlId="formImagenURL" className="mt-3">
                            <Form.Label>URL de la imagen</Form.Label>
                            <Form.Control type="text" value={imagenURL} onChange={(e) => setImagenURL(e.target.value)} placeholder="Ejemplo: https://misitio.com/imagen.jpg" />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Crear
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};