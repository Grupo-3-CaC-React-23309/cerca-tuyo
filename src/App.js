import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import { PetGrid } from "./components/PetGrid";
import NavBar from "./components/NavBar";
//import { Create } from "./components/Create";
//import { Edit } from "./components/Edit";




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar /> {/* La barra de navegación se renderiza independientemente de la ruta */}
        <Routes>
          <Route path="/" element={<PetGrid />} />
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
