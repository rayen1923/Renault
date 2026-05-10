import { useEffect, useState } from "react";
import Layout from "./Layout";
import api from "../api/api";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    id: 0,
    serie: "",
    chassisNumber: "",
  });

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const res = await api.get("/vehicles");
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ===== FORM =====
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ===== OPEN ADD =====
  const openAdd = () => {
    setForm({
      id: 0,
      serie: "",
      chassisNumber: "",
    });
    setShowModal(true);
  };

  // ===== SAVE VEHICLE =====
  const handleSave = async () => {
    try {
      await api.post("/vehicles", {
        id: 0,
        serie: form.serie,
        chassisNumber: form.chassisNumber,
        createdAt: new Date().toISOString(),
      });

      setShowModal(false);
      loadVehicles();
    } catch (err) {
      console.error(err);
    }
  };

  // ===== LOGIN (optional API) =====
  const handleLogin = async (vehicle) => {
    try {
      await api.post("/vehicles/login", vehicle);
      alert("Vehicle login success");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div style={{ padding: 20 }}>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Vehicles</h1>

          <button onClick={openAdd} style={btnAdd}>
            + Add Vehicle
          </button>
        </div>

        {/* TABLE */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={tableStyle}>
            <thead style={{ background: "black", color: "white" }}>
              <tr>
                <th>ID</th>
                <th>Serie</th>
                <th>Chassis Number</th>
                <th>Created At</th>
              </tr>
            </thead>

            <tbody>
              {vehicles.map((v) => (
                <tr key={v.id}>
                  <td style={td}>{v.id}</td>
                  <td style={td}>{v.serie}</td>
                  <td style={td}>{v.chassisNumber}</td>
                  <td style={td}>
                    {new Date(v.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* MODAL */}
        {showModal && (
          <div style={modalOverlay}>
            <div style={modalBox}>

              <h2>Add Vehicle</h2>

              <input
                name="serie"
                placeholder="Serie"
                value={form.serie}
                onChange={handleChange}
                style={input}
              />

              <input
                name="chassisNumber"
                placeholder="Chassis Number"
                value={form.chassisNumber}
                onChange={handleChange}
                style={input}
              />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={handleSave} style={btnSave}>
                  Save
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  style={btnCancel}
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}

/* ===== STYLES ===== */

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: 10,
};

const td = {
  border: "1px solid #ddd",
  padding: 10,
};

const btnAdd = {
  background: "black",
  color: "white",
  padding: 10,
  border: "none",
  cursor: "pointer",
};

const btnBlue = {
  background: "#007bff",
  color: "white",
  padding: "5px 10px",
  border: "none",
  cursor: "pointer",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalBox = {
  background: "white",
  padding: 20,
  width: 400,
};

const input = {
  width: "100%",
  padding: 8,
  marginBottom: 10,
};

const btnSave = {
  background: "green",
  color: "white",
  padding: 10,
  width: "48%",
};

const btnCancel = {
  background: "red",
  color: "white",
  padding: 10,
  width: "48%",
};