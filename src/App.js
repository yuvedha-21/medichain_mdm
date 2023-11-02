import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "../node_modules//bootstrap/dist/css/bootstrap.css";
import LandingPage from "./pages/landingPage";
import DoctorPage from "./pages/doctorPage";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/doctor" element={<DoctorPage/>}/>
      </Routes>
    </BrowserRouter>
 
  );
}

export default App;
