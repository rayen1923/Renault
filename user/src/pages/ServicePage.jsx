import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function ServicePage() {
    const navigate = useNavigate();

    const [services, setServices] =
        useState([]);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        try {
            const res = await api.get(
                "/services"
            );

            setServices(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const selectService = (service) => {
        sessionStorage.setItem(
            "service",
            JSON.stringify(service)
        );

        navigate("/agency");
    };

    return (
        <>
            {/* NAVBAR */}
            <div style={navbar}>
                <h1 style={logoText}>
                    AutoService
                </h1>

                <img
                    src="/src/assets/renault.png"
                    alt="Renault Logo"
                    style={logo}
                />
            </div>

            {/* PAGE */}
            <div style={container}>
                <h2 style={pageTitle}>
                    Nos Services
                </h2>

                <div style={servicesGrid}>
                    {services.map((service) => (
                        <div
                            key={service.id}
                            style={serviceCard}
                            onClick={() =>
                                selectService(
                                    service
                                )
                            }
                        >
                            <img
                                src={`/img/${service.img}`}
                                alt={
                                    service.name
                                }
                                style={
                                    serviceImg
                                }
                            />

                            <h3
                                style={
                                    serviceTitle
                                }
                            >
                                {service.name}
                            </h3>

                            <p
                                style={
                                    serviceDesc
                                }
                            >
                                {
                                    service.description
                                }
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

/* ================= STYLES ================= */

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
    padding: "50px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
};

const pageTitle = {
    textAlign: "center",
    marginBottom: "30px",
};

const servicesGrid = {
    display: "grid",
    gridTemplateColumns:
        "repeat(3, 1fr)",
    gap: "20px",
};

const serviceCard = {
    background: "white",
    borderRadius: "10px",
    padding: "20px",
    boxShadow:
        "0 5px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.2s",
};

const serviceImg = {
    width: "60px",
    height: "60px",
    marginBottom: "15px",
};

const serviceTitle = {
    marginBottom: "10px",
    color: "#ff0000",
};

const serviceDesc = {
    fontSize: "14px",
    color: "#555",
};