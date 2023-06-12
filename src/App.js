import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthContext from './authentication/AuthContext';

import { Crear } from "./components/Crear";
import { Editar } from "./components/Editar";
import { PetGrid } from "./components/PetGrid";
import { NavBar } from "./components/NavBar";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { Register } from "./components/Register";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleLogin = (userEmail) => {

    setIsLoggedIn(true);
    setUserEmail(userEmail);

  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");

  };

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider value={{ isLoggedIn, userEmail, onLogin: handleLogin, onLogout: handleLogout }}>
          <NavBar />
          {/* El resto de tus componentes van aquí */}
       
        <Routes>
          <Route path="/" element={<PetGrid />} />
          <Route path="/crear" element={<Crear />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/editar/:id" element={<Editar/>} />
          
          {/* Aquí puedes añadir más rutas */}
         </Routes> 
        </AuthContext.Provider> {/* La barra de navegación se renderiza independientemente de la ruta */}
      </BrowserRouter>
    </div>
  );
}

export default App;
