import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Agencies from "./pages/agencies";
import Services from "./pages/services";
import Vehicles from "./pages/vehicles";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agencies" element={<Agencies />} />
        <Route path="/services" element={<Services />} />
        <Route path="/vehicles" element={<Vehicles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;