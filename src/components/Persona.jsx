import { useState, useEffect, useContext } from "react";
import { db } from '../firebaseConfig/firebaseConfig'
import AuthContext from '../authentication/AuthContext';
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";

export const Persona = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const { id } = useParams();
  
   useEffect(() => {
        const checkIfUserExists = async () => {
            if (isLoggedIn) {
                const q = query(collection(db, "personas"), where("user", "==", id));
                const querySnapshot = await getDocs(q);
                console.log(id);
                if (!querySnapshot.empty) {
                    const docData = querySnapshot.docs[0];
                    console.log(docData)
                    //setDocId(docData.id);  // Store the document ID
                    const data = docData.data();
                    setNombre(data.nombre);
                    setApellido(data.apellido);
                    setDomicilio(data.domicilio);
                    setLocalidad(data.localidad);
                    setCodigoPostal(data.codigoPostal.toString());  // Convert back to string for the form
                    setTipo(data.vivienda);
                    setCondicion(data.condicion);
                    setConvivientes(data.convivientes);
                    setOtrasMascotas(data.otrasMascotas);
                    setVacaciones(data.vacaciones);
                }
            }
        }

        checkIfUserExists();
    }, []);

    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [otrasMascotas, setOtrasMascotas] = useState("");
    const [apellido, setApellido] = useState("");
    const [domicilio, setDomicilio] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [condicion, setCondicion] = useState("");
    const [convivientes, setConvivientes] = useState("");
    const [vacaciones, setVacaciones] = useState("");

    const Formulario = collection(db, "personas");

    const handleSubmit = async (event) => {
        event.preventDefault();
        window.history.back();
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNombre" className="mt-3">
                            <Form.Label>Nombre *</Form.Label>
                            <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ejemplo: Bruce" required />
                        </Form.Group>

                        <Form.Group controlId="formApellido" className="mt-3">
                            <Form.Label>Apellido *</Form.Label>
                            <Form.Control type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Ejemplo: Wayne" />
                        </Form.Group>

                        <Form.Group controlId="formVivienda" className="mt-3">
                            <Form.Label>Tipo de vivienda *</Form.Label>
                            <Form.Select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                                <option value="">Elegir...</option>
                                <option value="Departamento">Departamento</option>
                                <option value="Casa">Casa</option>
                                <option value="Otro">Otro</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formLocalidad" className="mt-3">
                            <Form.Label>Localidad *</Form.Label>
                            <Form.Control type="text" value={localidad} onChange={(e) => setLocalidad(e.target.value)} placeholder="Ejemplo: Gotica" required />
                        </Form.Group>

                        <Form.Group controlId="formOtrasMascotas" className="mt-3">
                            <Form.Label>Otras mascotas *</Form.Label>
                            <Form.Control type="text" value={otrasMascotas} onChange={(e) => setOtrasMascotas(e.target.value)} placeholder="Ejemplo: BatiPerro" required />
                        </Form.Group>
                        
                        <Form.Group controlId="formDomicilio" className="mt-3">
                            <Form.Label>Domicilio</Form.Label>
                            <Form.Control type="text" value={domicilio} onChange={(e) => setDomicilio(e.target.value)} placeholder="Ejemplo: Av. Rivadavia 1031" />
                        </Form.Group>

                        <Form.Group controlId="formCodigoPostal" className="mt-3">
                            <Form.Label>Codigo Postal</Form.Label>
                            <Form.Control type="number" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} placeholder="Ejemplo: 1414" />
                        </Form.Group>

                        <Form.Group controlId="formCondicion" className="mt-3">
                            <Form.Label>Sos Propietario o Alquilás?</Form.Label>
                            <Form.Select value={condicion} onChange={(e) => setCondicion(e.target.value)}>
                                <option disabled value="">Selecciona la opción...</option>
                                <option>Propietario</option>
                                <option>Inquilino</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formConvivientes" className="mt-3">
                            <Form.Label>Contanos con quién vivís y sus edades</Form.Label>
                            <Form.Control type="text" value={convivientes} onChange={(e) => setConvivientes(e.target.value)} placeholder="Ejemplo: Batichica 40 años" />
                        </Form.Group>

                        <Form.Group controlId="formvacaciones" className="mt-3">
                            <Form.Label>¿Qué harías con el animal en caso de vacaciones?</Form.Label>
                            <Form.Control type="text" value={vacaciones} onChange={(e) => setVacaciones(e.target.value)} placeholder="Detalle qué harías con la mascota" />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="my-3"
                            disabled={!isLoggedIn}
                            style={{ pointerEvents: !isLoggedIn ? 'none' : 'auto' }}
                        >
                            Volver
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
