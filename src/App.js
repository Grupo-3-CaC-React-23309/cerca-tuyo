import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthContext from './authentication/AuthContext';

import { Crear } from "./components/Crear";
import { Editar } from "./components/Editar";
import { PetGrid } from "./components/PetGrid";
import { MisPublicaciones } from "./components/MisPublicaciones";
import { NavBar } from "./components/NavBar";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { Register } from "./components/Register";
import {Footer} from "./components/Footer";
import {SobreNosotros} from "./components/SobreNosotros";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = (userEmail) => {
    setIsLoggedIn(true);
    setUserEmail(userEmail);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
  };
 
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <BrowserRouter>
        <AuthContext.Provider value={{ isLoggedIn, userEmail, onLogin: handleLogin, onLogout: handleLogout }}>
        <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
       
        <Routes>
          <Route path="/" element={<PetGrid />} />
          <Route path="/crear" element={<Crear />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/mis-publicaciones" element={<MisPublicaciones />} />
          <Route path="/editar/:id" element={<Editar/>} />
          <Route path="/sobre-nosotros" element={<SobreNosotros/>}/>

        </Routes> 
          <Footer darkMode={darkMode}/>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;