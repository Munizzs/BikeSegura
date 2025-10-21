import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapPage from "../src/components/pages/MapPage";
import {LoginPage} from "../src/components/pages/LoginPage";
import { RegisterPage } from "../src/components/pages/RegisterPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}
