import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import renaultLogo from "../assets/renault.png";
import keycloak from "../keycloak"; // Ensure this points to your Keycloak config file

export default function Layout({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [hover, setHover] = useState(null);
  const [hoverDash, setHoverDash] = useState(false);

  useEffect(() => {
    // If authenticated, extract user information from the ID token
    if (keycloak.authenticated) {
      setUser({
        fullName: keycloak.tokenParsed?.name || keycloak.tokenParsed?.preferred_username,
      });
    }
  }, []);

  const logout = () => {
  // 1. Clear everything locally
  localStorage.clear();
  sessionStorage.clear();

  // 2. Define the logout URL manually to ensure session destruction
  const baseUrl = "http://localhost:8081";
  const realm = "renault-realm";
  const clientId = "renault-client";
  const redirectUri = encodeURIComponent(window.location.origin);

  // This URL forces Keycloak to destroy the session associated with your browser
  const logoutUrl = `${baseUrl}/realms/${realm}/protocol/openid-connect/logout?client_id=${clientId}&post_logout_redirect_uri=${redirectUri}`;

  // 3. Force the browser to go there
  window.location.href = logoutUrl;
};

  return (
    <div style={styles.page}>
      {/* TOP BAR */}
      <div style={styles.topbar}>
        <div style={styles.brand}>AutoService</div>

        <img
          src={renaultLogo}
          alt="logo"
          style={{ ...styles.logo, cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        />
      </div>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <div>
          <div
            style={{
              ...styles.projectName,
              cursor: "pointer",
              color: hoverDash ? "#cc0000" : "#ff0000",
              transition: "0.2s",
            }}
            onMouseEnter={() => setHoverDash(true)}
            onMouseLeave={() => setHoverDash(false)}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </div>

          <div style={styles.userName}>
            {user?.fullName || "Utilisateur"}
          </div>
        </div>

        {/* MENU */}
        <div style={styles.menu}>
          <div
            style={{
              ...styles.link,
              ...(hover === "agencies" ? styles.linkHover : {}),
            }}
            onMouseEnter={() => setHover("agencies")}
            onMouseLeave={() => setHover(null)}
            onClick={() => navigate("/agencies")}
          >
            Agencies
          </div>

          <div
            style={{
              ...styles.link,
              ...(hover === "services" ? styles.linkHover : {}),
            }}
            onMouseEnter={() => setHover("services")}
            onMouseLeave={() => setHover(null)}
            onClick={() => navigate("/services")}
          >
            Services
          </div>

          <div
            style={{
              ...styles.link,
              ...(hover === "vehicles" ? styles.linkHover : {}),
            }}
            onMouseEnter={() => setHover("vehicles")}
            onMouseLeave={() => setHover(null)}
            onClick={() => navigate("/vehicles")}
          >
            Vehicles
          </div>
        </div>

        {/* LOGOUT */}
        <button
          style={{
            ...styles.logoutBtn,
            ...(hover === "logout" ? styles.logoutBtnHover : {}),
          }}
          onMouseEnter={() => setHover("logout")}
          onMouseLeave={() => setHover(null)}
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>{children}</div>
    </div>
  );
}

/* STYLES remain the same as your provided code */
const styles = {
  page: { width: "100%", height: "100vh", display: "flex", fontFamily: "Segoe UI", backgroundColor: "#f4f5f7" },
  topbar: { position: "absolute", top: 0, left: 0, right: 0, height: "65px", background: "linear-gradient(90deg, #ff0000, #cc0000)", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 25px", boxShadow: "0 2px 10px rgba(0,0,0,0.15)", zIndex: 10 },
  brand: { color: "#fff", fontSize: "22px", fontWeight: "700" },
  logo: { width: "34px", height: "34px" },
  sidebar: { width: "270px", marginTop: "65px", backgroundColor: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px", borderRight: "1px solid #eee" },
  projectName: { fontSize: "20px", fontWeight: "700", color: "#ff0000" },
  userName: { fontSize: "13px", color: "#666", marginTop: "5px", marginBottom: "20px" },
  menu: { display: "flex", flexDirection: "column", gap: "10px" },
  link: { padding: "12px", backgroundColor: "#f7f7f7", borderRadius: "8px", cursor: "pointer", fontWeight: "500", transition: "0.2s" },
  linkHover: { backgroundColor: "#ff0000", color: "#fff" },
  logoutBtn: { padding: "12px", backgroundColor: "#111", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" },
  logoutBtnHover: { backgroundColor: "#ff0000" },
  content: { flex: 1, marginTop: "65px", padding: "40px", overflowY: "auto" },
};