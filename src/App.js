import { BrowserRouter, Route, Routes } from "react-router-dom";

import Upload from "./Upload";
import LandingPage from "./pages/landingPage";
import DoctorPage from "./pages/doctorPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Upload/>} />
        <Route path="/doctor" element={<DoctorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
