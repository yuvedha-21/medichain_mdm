import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules//bootstrap/dist/css/bootstrap.css";
import LandingPage from "./pages/landingPage";
import DoctorPage from "./pages/doctorPage";
// import SuperOwnerComponent from "./components/owner/superOwnerComponent";
import OwnerPage from "./pages/ownerPage";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/doctor" element={<DoctorPage/>}/>
        <Route path="/owner" element={<OwnerPage/>}/>
      </Routes>
    </BrowserRouter>
 
  );
}

export default App;