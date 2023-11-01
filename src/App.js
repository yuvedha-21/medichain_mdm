import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "../node_modules//bootstrap/dist/css/bootstrap.css";
import Headerbar from "./components/Header_footer/navbar/headerbar";
import Scrollbar from "./components/Header_footer/navbar/scrollbar";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Headerbar/>} /> */}
        <Route path="/" element={<Scrollbar/>} />

      </Routes>
    </BrowserRouter>
 
  );
}

export default App;
