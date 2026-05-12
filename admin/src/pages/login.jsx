import { useEffect, useRef, useState } from "react";

import Keycloak from "keycloak-js";

import renaultLogo from "../assets/renault.png";



const keycloakConfig = {

  url: "http://localhost:8081",

  realm: "renault-realm",

  clientId: "renault-client",

};



const keycloak = new Keycloak(keycloakConfig);



export default function Login() {

  const isInitialized = useRef(false); // Prevents double-init in React 19

  const [error, setError] = useState(null);



  useEffect(() => {

    if (isInitialized.current) return;

    isInitialized.current = true;



    keycloak

      .init({

        onLoad: "check-sso",

        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",

        pkceMethod: "S256"

      })

      .then((authenticated) => {

        if (authenticated) {

          localStorage.setItem("token", keycloak.token);

          window.location.href = "/dashboard";

        }

      })

      .catch((err) => {

        console.error("Keycloak Init Error:", err);

        setError("Impossible de contacter le serveur d'authentification.");

      });

  }, []);



  const handleLogin = () => {

    keycloak.login();

  };



  if (error) return <div style={{ color: "red", padding: "20px" }}>{error}</div>;



  return (

    <div style={styles.page}>

      <div style={styles.topbar}>

        <div style={styles.brand}>AutoService</div>

        <img src={renaultLogo} alt="Renault" style={styles.logo} />

      </div>



      <div style={styles.card}>

        <h1 style={styles.title}>Identification</h1>

        <button onClick={handleLogin} style={styles.button}>

          Se connecter avec Keycloak

        </button>

      </div>

    </div>

  );

}



// Make sure these STYLES are defined or it will go white!

const styles = {

  page: { display: "flex", flexDirection: "column", height: "100vh", alignItems: "center", backgroundColor: "#f4f4f4" },

  topbar: { width: "100%", padding: "20px", display: "flex", justifyContent: "space-between", background: "#ff0000", color: "#fff", boxSizing: "border-box" },

  brand: { fontSize: "24px", fontWeight: "bold" },

  logo: { height: "30px" },

  card: { padding: "40px", background: "white", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", textAlign: "center", marginTop: "100px" },

  title: { marginBottom: "20px" },

  button: { padding: "10px 20px", backgroundColor: "#ff0000", border: "none", cursor: "pointer", fontWeight: "bold", borderRadius: "4px" }

};