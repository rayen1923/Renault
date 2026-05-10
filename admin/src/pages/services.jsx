import { useEffect, useState } from "react";
import Layout from "./Layout";
import api from "../api/api";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    id: 0,
    name: "",
    description: "",
    img: "",
    durationMinutes: 0,
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await api.get("/services");
      setServices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ===== FORM HANDLER =====
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ===== OPEN ADD =====
  const openAdd = () => {
    setIsEdit(false);
    setForm({
      id: 0,
      name: "",
      description: "",
      img: "",
      durationMinutes: 0,
    });
    setShowModal(true);
  };

  // ===== OPEN EDIT =====
  const openEdit = (service) => {
    setIsEdit(true);
    setForm({
      id: service.id,
      name: service.name,
      description: service.description,
      img: service.img.replace(".png", ""),
      durationMinutes: service.durationMinutes,
    });
    setShowModal(true);
  };

  // ===== SAVE (ADD + UPDATE) =====
  const handleSave = async () => {
    try {
      const payload = {
        id: form.id,
        name: form.name,
        description: form.description,
        img: form.img.endsWith(".png")
          ? form.img
          : `${form.img}.png`,
        durationMinutes: Number(form.durationMinutes),
      };

      if (isEdit) {
        await api.put("/services", payload);
      } else {
        await api.post("/services", payload);
      }

      setShowModal(false);
      loadServices();
    } catch (err) {
      console.error(err);
    }
  };

  // ===== DELETE =====
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/services/${id}`);
      loadServices();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <Layout>
      <div style={{ padding: 20 }}>

        {/* TOP BAR */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Services</h1>

          <button onClick={openAdd} style={btnAdd}>
            + Add Service
          </button>
        </div>

        {/* TABLE */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={tableStyle}>
            <thead style={{ backgroundColor: "black", color: "white" }}>
              <tr>
                <th style={th}>ID</th>
                <th style={th}>Name</th>
                <th style={th}>Description</th>
                <th style={th}>Image</th>
                <th style={th}>Duration</th>
                <th style={th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {services.map((s) => (
                <tr key={s.id}>
                  <td style={td}>{s.id}</td>
                  <td style={td}>{s.name}</td>
                  <td style={td}>{s.description}</td>

                  {/* IMAGE */}
                  <td style={td}>
                    <img
                      src={`/img/${s.img}`}
                      alt={s.name}
                      style={{ width: 50, height: 50 }}
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/50")
                      }
                    />
                  </td>

                  <td style={td}>{s.durationMinutes}</td>

                  {/* ACTION */}
                  <td style={td}>
                    <button onClick={() => openEdit(s)} style={btnEdit}>
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(s.id)}
                      style={btnDelete}
                    >
                      Delete
                    </button>
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

              <h2>{isEdit ? "Update Service" : "Add Service"}</h2>

              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                style={input}
              />

              <input
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                style={input}
              />

              <input
                name="img"
                placeholder="Image name (air-conditioning)"
                value={form.img}
                onChange={handleChange}
                style={input}
              />

              <input
                name="durationMinutes"
                type="number"
                placeholder="Duration"
                value={form.durationMinutes}
                onChange={handleChange}
                style={input}
              />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={handleSave} style={btnSave}>
                  {isEdit ? "Update" : "Save"}
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
  marginTop: 20,
};

const th = {
  padding: 10,
  border: "1px solid #444",
};

const td = {
  padding: 10,
  border: "1px solid #ddd",
};

const btnAdd = {
  background: "black",
  color: "white",
  padding: "10px 15px",
  border: "none",
  cursor: "pointer",
};

const btnEdit = {
  background: "#007bff",
  color: "white",
  padding: "6px 10px",
  border: "none",
  cursor: "pointer",
  marginRight: "5px",
};

const btnDelete = {
  background: "red",
  color: "white",
  padding: "6px 10px",
  border: "none",
  cursor: "pointer",
};

const btnSave = {
  background: "green",
  color: "white",
  padding: "10px",
  border: "none",
  cursor: "pointer",
  width: "48%",
};

const btnCancel = {
  background: "red",
  color: "white",
  padding: "10px",
  border: "none",
  cursor: "pointer",
  width: "48%",
};

const input = {
  width: "100%",
  padding: 8,
  marginBottom: 10,
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
  borderRadius: 8,
};