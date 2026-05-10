import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

export default function AgencyPage() {
    const navigate = useNavigate();
    const [agencies, setAgencies] = useState([]);

    const SERVICE_ID = 7; // 👈 your selected service

    useEffect(() => {
        loadAgenciesByService();
    }, []);

    const loadAgenciesByService = async () => {
        try {
            // 1. GET ONLY agencies that have service 7
            const res = await api.get(
                `/agencyservices/service/${SERVICE_ID}`
            );

            const dataWithCoords = res.data.map((agency) => {
                let lat = 0;
                let lng = 0;

                if (agency.address && agency.address.includes(",")) {
                    const parts = agency.address.split(",");
                    lat = parseFloat(parts[0]);
                    lng = parseFloat(parts[1]);
                }

                return {
                    ...agency,
                    coords: [lat, lng],
                };
            });

            setAgencies(dataWithCoords);
        } catch (err) {
            console.error(err);
        }
    };

    const selectAgency = (agency) => {
        sessionStorage.setItem("agency", JSON.stringify(agency));
        navigate("/rdv");
    };

    return (
        <>
            {/* NAVBAR */}
            <div style={navbar}>
                <h1 style={logoText}>AutoService</h1>

                <img
                    src="/src/assets/renault.png"
                    alt="Renault"
                    style={logo}
                />
            </div>

            {/* MAP */}
            <div style={container}>
                <h2 style={title}>
                    Agences disponibles pour ce service
                </h2>

                <div style={mapWrapper}>
                    <MapContainer
                        center={[33.8869, 9.5375]}
                        zoom={7}
                        style={{
                            height: "600px",
                            width: "100%",
                            borderRadius: "10px",
                        }}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        {agencies.map((agency) => (
                            <Marker
                                key={agency.id}
                                position={agency.coords}
                            >
                                <Popup>
                                    <b>{agency.name}</b>
                                    <br />
                                    {agency.address}

                                    <hr />

                                    <button
                                        style={btn}
                                        onClick={() =>
                                            selectAgency(agency)
                                        }
                                    >
                                        Réserver
                                    </button>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </>
    );
}

/* styles unchanged */
const navbar = {
    width: "100%",
    background: "#ff0000",
    padding: "15px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const logoText = {
    fontSize: "20px",
    color: "black",
    fontWeight: "700",
};

const logo = {
    width: "40px",
};

const container = {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
};

const title = {
    textAlign: "center",
    marginBottom: "20px",
};

const mapWrapper = {
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
};

const btn = {
    marginTop: "10px",
    padding: "6px 12px",
    background: "#ff0000",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};