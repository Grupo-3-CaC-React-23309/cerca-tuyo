import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthContext from './authentication/AuthContext';

import { Crear } from "./components/Crear";
import { PetGrid } from "./components/PetGrid";
import { NavBar } from "./components/NavBar";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { Register } from "./components/Register";
import {Footer} from "./components/Footer";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider value={{ isLoggedIn, onLogin: handleLogin, onLogout: handleLogout }}>
          <NavBar />
          <Footer/>
          {/* El resto de tus componentes van aquí */}
       
        <Routes>
          <Route path="/" element={<PetGrid />} />
          <Route path="/crear" element={<Crear />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/registro" element={<Register />} />

          {/* Aquí puedes añadir más rutas */}
          {/*<Route path="/create" element={<Create/>} />
          <Route path="/edit/:id" element={<Edit/>} />
          */}
        </Routes> 
        </AuthContext.Provider> {/* La barra de navegación se renderiza independientemente de la ruta */}
      </BrowserRouter>
    </div>
  );
}

export default App;
