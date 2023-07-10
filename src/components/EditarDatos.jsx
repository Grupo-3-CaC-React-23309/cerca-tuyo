import { useState, useEffect, useContext } from "react";
import { db } from '../firebaseConfig/firebaseConfig'
import AuthContext from '../authentication/AuthContext';
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";

export const EditarDatos = () => {
    const { isLoggedIn, userEmail } = useContext(AuthContext);

    const navigate = useNavigate();
    const [docId, setDocId] = useState(null);  // NEW: Store the document ID to update

    // Add these state variables:
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [domicilio, setDomicilio] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [tipo, setTipo] = useState("");
    const [condicion, setCondicion] = useState("");
    const [convivientes, setConvivientes] = useState("");
    const [otrasMascotas, setOtrasMascotas] = useState("");
    const [vacaciones, setVacaciones] = useState("");

    useEffect(() => {
        const getExistingUser = async () => {
            if (isLoggedIn) {
                const q = query(collection(db, "personas"), where("user", "==", userEmail));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const docData = querySnapshot.docs[0];
                    setDocId(docData.id);  // Store the document ID
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
                } else {
                    navigate("/mis-datos");
                }
            }
        }

        getExistingUser();
    }, [isLoggedIn, userEmail, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const numerica = codigoPostal ? parseFloat(codigoPostal) : null;

        if (docId) {  // Make sure we have a document to update
            const docToUpdate = doc(db, "personas", docId);
            await updateDoc(docToUpdate, {
                nombre,
                apellido,
                domicilio,
                localidad,
                codigoPostal: numerica,
                vivienda: tipo,
                condicion,
                convivientes,
                otrasMascotas,
                vacaciones,
                user: userEmail,
            });
            // Navegar al inicio
            Swal.fire("Datos actualizados correctamente");
            navigate("/cerca-tuyo/");            
        } else {
            Swal.fire("Hubo un problema al actualizar tus datos");
        }
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
                            Enviar datos
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
