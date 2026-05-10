import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Tesseract from "tesseract.js";

export default function Login() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [serie, setSerie] = useState("");
    const [chassisNumber, setChassisNumber] = useState("");
    const [error, setError] = useState("");
    const [isScanning, setIsScanning] = useState(false);

    const handleLogin = async () => {
        if (!serie || !chassisNumber) {
            setError("Veuillez remplir tous les champs ou scanner la carte.");
            return;
        }
        try {
            const res = await api.post("/vehicles/login", { serie, chassisNumber });
            sessionStorage.setItem("vehicle", JSON.stringify(res.data));
            navigate("/contact");
        } catch (err) {
            setError("Identifiants invalides (Vérifiez la série et le châssis)");
        }
    };

    const handleFileUpload = async (event) => {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;

        setIsScanning(true);
        setError("");

        try {
            let detectedChassis = "";
            let detectedSerie = "";

            // Loop through each selected file
            for (const file of files) {
                const { data: { text } } = await Tesseract.recognize(file, 'eng+ara');
                const cleanText = text.replace(/\s+/g, ' ');

                // 1. CHASSIS DETECTION
                const vinRegex = /[A-Z0-9]{17}/i;
                const chassisMatch = cleanText.match(vinRegex);
                if (chassisMatch && !detectedChassis) {
                    detectedChassis = chassisMatch[0].toUpperCase();
                }

                // 2. TUNISIAN PLATE DETECTION
                const allNumbers = cleanText.match(/\d+/g) || [];
                const possibleReg = allNumbers.filter(n => n.length === 4);
                const possibleSerie = allNumbers.filter(n => n.length >= 2 && n.length <= 3);

                if (possibleReg.length > 0 && possibleSerie.length > 0 && !detectedSerie) {
                    detectedSerie = `${possibleSerie[0]} TUN ${possibleReg[0]}`;
                }
            }

            // Update states if findings were made
            if (detectedChassis) setChassisNumber(detectedChassis);
            if (detectedSerie) setSerie(detectedSerie);

            if (!detectedChassis && !detectedSerie) {
                setError("Aucune information lisible trouvée sur les images.");
            } else if (!detectedChassis || !detectedSerie) {
                setError("Certaines informations manquent encore. Essayez l'autre face.");
            }

        } catch (err) {
            setError("Erreur lors de l'analyse.");
            console.error("OCR Error:", err);
        } finally {
            setIsScanning(false);
            event.target.value = null; // Reset input
        }
    };

    return (
        <div style={pageWrapper}>
            <div style={navbar}>
                <h1 style={logoText}>AutoService</h1>
                <img src="/src/assets/renault.png" alt="Logo" style={logo} />
            </div>

            <div style={container}>
                <div style={formBox}>
                    <h2 style={title}>Identification</h2>

                    <div style={inputGroup}>
                        <label style={label}>Série du véhicule</label>
                        <input
                            type="text"
                            placeholder="ex: 106 TUN 9580"
                            value={serie}
                            onChange={(e) => setSerie(e.target.value)}
                            style={input}
                        />
                    </div>

                    <div style={inputGroup}>
                        <label style={label}>Numéro de Châssis (17 car.)</label>
                        <input
                            type="text"
                            placeholder="VF3..."
                            value={chassisNumber}
                            onChange={(e) => setChassisNumber(e.target.value)}
                            style={input}
                        />
                    </div>

                    {error && <p style={errorStyle}>{error}</p>}

                    {/* UPDATED: added 'multiple' attribute */}
                    <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        ref={fileInputRef} 
                        style={{ display: "none" }} 
                        onChange={handleFileUpload} 
                    />

                    <button
                        style={{ ...btn, ...scanBtn, opacity: isScanning ? 0.7 : 1 }}
                        onClick={() => fileInputRef.current.click()}
                        disabled={isScanning}
                    >
                        {isScanning ? "Analyse ..." : "📷 Scanner"}
                    </button>

                    <button style={btn} onClick={handleLogin}>
                        Se connecter
                    </button>
                    
                    <p style={hint}>
                        Sélectionnez une ou deux photos (Recto/Verso) pour un scan complet.
                    </p>
                </div>
            </div>
        </div>
    );
}

/* Styles remain the same as your original code */
const pageWrapper = { fontFamily: "'Segoe UI', Roboto, sans-serif" };
const navbar = { width: "100%", height: "60px", background: "#ff0000", padding: "0 25px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" };
const logoText = { fontSize: "20px", color: "white", fontWeight: "700", margin: 0 };
const logo = { width: "35px", filter: "brightness(0) invert(1)" };
const container = { display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 60px)", background: "#f8f9fa" };
const formBox = { background: "white", padding: "30px", borderRadius: "16px", width: "350px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" };
const title = { textAlign: "center", marginBottom: "25px", fontSize: "24px", color: "#333" };
const inputGroup = { marginBottom: "15px" };
const label = { display: "block", fontSize: "12px", color: "#666", marginBottom: "5px", fontWeight: "600" };
const input = { width: "100%", height: "45px", padding: "0 15px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "15px", boxSizing: "border-box" };
const btn = { width: "100%", height: "48px", background: "#ff0000", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", marginTop: "12px", color: "white", fontSize: "15px", transition: "0.3s" };
const scanBtn = { background: "#2d3436", marginBottom: "5px" };
const errorStyle = { color: "#d63031", marginBottom: "15px", fontSize: "13px", textAlign: "center", backgroundColor: "#fff5f5", padding: "8px", borderRadius: "5px" };
const hint = { fontSize: "11px", color: "#999", textAlign: "center", marginTop: "15px" };