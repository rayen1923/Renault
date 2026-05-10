import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ContactPage from "./pages/ContactPage";
import ServicePage from "./pages/ServicePage";
import AgencyPage from "./pages/AgencyPage";
import RdvPage from "./pages/RdvPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* NEW PAGES */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/agency" element={<AgencyPage />} />
        <Route path="/rdv" element={<RdvPage />} />
      </Routes>
    </BrowserRouter>
  );
}RdvPage