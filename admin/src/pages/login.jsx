import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import renaultLogo from "../assets/renault.png";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/dashboard");
    } catch (err) {
      setError("Email ou mot de passe invalide");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.topbar}>
        <div style={styles.brand}>AutoService</div>

        <img
          src={renaultLogo}
          alt="Renault"
          style={styles.logo}
        />
      </div>

      <div style={styles.card}>
        <h1 style={styles.title}>Identification</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <button
          onClick={login}
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Chargement..." : "Se connecter"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#e5e5e7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Arial",
    boxSizing: "border-box",
  },

  topbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "60px",
    backgroundColor: "#ff0000",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "25px",
    paddingRight: "25px",
    boxSizing: "border-box",
    zIndex: 10,
  },

  brand: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "white",
  },

  logo: {
    width: "30px",
    height: "30px",
    objectFit: "contain",
  },

  card: {
    width: "420px",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    boxShadow: "0px 5px 20px rgba(0,0,0,0.15)",
  },

  title: {
    textAlign: "center",
    margin: 0,
    marginBottom: "10px",
    fontSize: "32px",
    color: "#111",
    fontWeight: "bold",
  },

  input: {
    height: "50px",
    border: "1px solid #d5d5d5",
    borderRadius: "5px",
    paddingLeft: "15px",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "#f8f8f8",
    boxSizing: "border-box",
    width: "100%",
    color: "#111",
  },

  button: {
    height: "50px",
    backgroundColor: "#ff0000",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
  },

  error: {
    color: "red",
    textAlign: "center",
    fontSize: "14px",
  },
};