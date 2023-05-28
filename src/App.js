import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthContext from './authentication/AuthContext';

import { Crear } from "./components/Crear";
import { PetGrid } from "./components/PetGrid";
import { NavBar } from "./components/NavBar";
import { Login } from "./components/Login";
import { Register } from "./components/Register";


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
          {/* El resto de tus componentes van aquí */}
        </AuthContext.Provider> {/* La barra de navegación se renderiza independientemente de la ruta */}
        <Routes>
          <Route path="/" element={<PetGrid />} />
          <Route path="/crear" element={<Crear />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          {/* Aquí puedes añadir más rutas */}
          {/*<Route path="/create" element={<Create/>} />
          <Route path="/edit/:id" element={<Edit/>} />
          */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
