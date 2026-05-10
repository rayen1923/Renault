import { useEffect, useState } from "react";
import Layout from "./Layout";
import api from "../api/api";

export default function Agencies() {
  const [agencies, setAgencies] = useState([]);
  const [services, setServices] = useState([]);
  const [linkedServices, setLinkedServices] = useState([]);

  const [selectedAgency, setSelectedAgency] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    id: 0,
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    loadAgencies();
    loadServices();
  }, []);

  // ===== LOAD =====
  const loadAgencies = async () => {
    const res = await api.get("/agencies");
    setAgencies(res.data);
  };

  const loadServices = async () => {
    const res = await api.get("/services");
    setServices(res.data);
  };

  const loadLinkedServices = async (agencyId) => {
    setSelectedAgency(agencyId);
    const res = await api.get(`/agencyservices/${agencyId}`);
    setLinkedServices(res.data);
  };

  // ===== FORM =====
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ===== ADD =====
  const openAdd = () => {
    setIsEdit(false);
    setForm({
      id: 0,
      name: "",
      address: "",
      email: "",
      phone: "",
    });
    setShowModal(true);
  };

  // ===== EDIT =====
  const openEdit = (agency) => {
    setIsEdit(true);
    setForm(agency);
    setShowModal(true);
  };

  // ===== SAVE (ADD / UPDATE) =====
  const handleSave = async () => {
    try {
      if (isEdit) {
        await api.put("/agencies", form);
      } else {
        await api.post("/agencies", form);
      }

      setShowModal(false);
      loadAgencies();
    } catch (err) {
      console.error(err);
    }
  };

  // ===== DELETE =====
  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this agency?");
    if (!ok) return;

    await api.delete(`/agencies/${id}`);
    loadAgencies();
  };

  // ===== LINK SERVICE =====
  const addService = async (serviceId) => {
    await api.post(`/agencyservices/${selectedAgency}/${serviceId}`);
    loadLinkedServices(selectedAgency);
  };

  // ===== UNLINK SERVICE =====
  const removeService = async (serviceId) => {
    await api.delete(`/agencyservices/${selectedAgency}/${serviceId}`);
    loadLinkedServices(selectedAgency);
  };

  const linkedIds = linkedServices.map((s) => s.id);
  const availableServices = services.filter(
    (s) => !linkedIds.includes(s.id)
  );

  return (
    <Layout>
      <div style={{ padding: 20 }}>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Agencies</h1>

          <button onClick={openAdd} style={btnAdd}>
            + Add Agency
          </button>
        </div>

        {/* TABLE */}
        <table style={tableStyle}>
          <thead style={{ background: "black", color: "white" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {agencies.map((a) => (
              <tr key={a.id}>
                <td style={td}>{a.id}</td>
                <td style={td}>{a.name}</td>
                <td style={td}>{a.address}</td>
                <td style={td}>{a.email}</td>
                <td style={td}>{a.phone}</td>

                <td style={td}>
                  <button onClick={() => openEdit(a)} style={btnEdit}>
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(a.id)}
                    style={btnDelete}
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => loadLinkedServices(a.id)}
                    style={btnBlue}
                  >
                    Services
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* SERVICE LINKING */}
        {selectedAgency && (
          <>
            <h2 style={{ marginTop: 30 }}>
              Agency {selectedAgency} Services
            </h2>

            <div style={{ display: "flex", gap: 20 }}>

              {/* AVAILABLE */}
              <div style={box}>
                <h3>Available</h3>
                {availableServices.map((s) => (
                  <div key={s.id} style={item}>
                    {s.name}
                    <button
                      onClick={() => addService(s.id)}
                      style={btnGreen}
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>

              {/* LINKED */}
              <div style={box}>
                <h3>Linked</h3>
                {linkedServices.map((s) => (
                  <div key={s.id} style={item}>
                    {s.name}
                    <button
                      onClick={() => removeService(s.id)}
                      style={btnRed}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

            </div>
          </>
        )}

        {/* MODAL */}
        {showModal && (
          <div style={modalOverlay}>
            <div style={modalBox}>

              <h2>{isEdit ? "Update Agency" : "Add Agency"}</h2>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                style={input}
              />

              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                style={input}
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                style={input}
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
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

const btnAdd = { background: "black", color: "white", padding: 10 };
const btnEdit = { background: "#007bff", color: "white", marginRight: 5, padding: 5 };
const btnDelete = { background: "red", color: "white", marginRight: 5, padding: 5 };
const btnBlue = { background: "orange", color: "white", padding: 5 };

const box = { flex: 1, border: "1px solid #ddd", padding: 10 };
const item = { display: "flex", justifyContent: "space-between", padding: 5 };

const btnGreen = { background: "green", color: "white", padding: 4 };
const btnRed = { background: "red", color: "white", padding: 4 };

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

const btnSave = { background: "green", color: "white", padding: 10, width: "48%" };
const btnCancel = { background: "red", color: "white", padding: 10, width: "48%" };