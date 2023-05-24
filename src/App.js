import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import { PetGrid } from "./components/PetGrid";
//import { Create } from "./components/Create";
//import { Edit } from "./components/Edit";




function App() {
  return (
    <div className="App">
     <BrowserRouter>
 <Routes>
 <Route path="/" element= {<PetGrid/>} />
 {/*<Route path="/create" element={<Create/>} />
    <Route path="/edit/:id" element={<Edit/>} />
  */}
 </Routes>
     </BrowserRouter>
    </div>
  );

}

export default App;
