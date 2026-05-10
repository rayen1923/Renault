import { useEffect, useState } from "react";
import api from "../api/api";

export default function RdvPage() {
    const hours = [
        "8:00",
        "9:00",
        "10:00",
        "11:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
    ];

    const [currentMonday, setCurrentMonday] = useState(getMonday(new Date()));
    const [rdvs, setRdvs] = useState({});

    useEffect(() => {
        loadRdvs();
    }, []);

    const loadRdvs = async () => {
        try {
            const agency = JSON.parse(
                sessionStorage.getItem("agency")
            );

            if (!agency) return;

            const res = await api.get(
                `/rdv/agency/${agency.id}`
            );

            const grouped = {};

            res.data.forEach((r) => {
                const date =
                    r.appointmentDate.split("T")[0];

                const timeParts =
                    r.appointmentTime.split(":");

                const time = `${parseInt(
                    timeParts[0]
                )}:${timeParts[1]}`;

                if (!grouped[date])
                    grouped[date] = [];

                grouped[date].push(time);
            });

            setRdvs(grouped);
        } catch (err) {
            console.error(
                "LOAD RDV ERROR:",
                err
            );
        }
    };

    function getMonday(d) {
        const date = new Date(d);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }

    function formatDate(d) {
        return d.toISOString().split("T")[0];
    }

    const selectSlot = async (date, hour) => {
        console.log("CLICK SLOT:", date, hour);

        const vehicle = JSON.parse(sessionStorage.getItem("vehicle"));
        const phone = JSON.parse(sessionStorage.getItem("phone"));
        const service = JSON.parse(sessionStorage.getItem("service"));
        const agency = JSON.parse(sessionStorage.getItem("agency"));

        if (!vehicle || !phone || !service || !agency) {
            alert("Missing session data (vehicle / phone / service / agency)");
            return;
        }

        const formattedHour = hour.length === 4 ? "0" + hour + ":00" : hour + ":00";

        const payload = {
            vehicleId: vehicle.id,
            phoneNumberId: phone.id,
            serviceId: service.id,
            agencyId: agency.id,
            appointmentDate: date,
            appointmentTime: formattedHour,
        };

        console.log("PAYLOAD:", payload);

        try {
            const res = await api.post("/rdv", payload);

            console.log("SUCCESS:", res.data);

            alert("RDV confirmé ✅");

            loadRdvs();
        } catch (err) {
            console.error("RDV ERROR:", err.response?.data || err.message);
            alert("Erreur RDV");
        }
    };

    const changeWeek = (offset) => {
        const newDate = new Date(currentMonday);
        newDate.setDate(newDate.getDate() + offset * 7);
        setCurrentMonday(getMonday(newDate));
    };

    return (
        <>
            {/* NAVBAR */}
            <div style={navbar}>
                <h1 style={logoText}>AutoService</h1>
                <img src="/src/assets/renault.png" style={logo} />
            </div>

            <div style={container}>
                <h2 style={title}>Sélectionnez RDV</h2>

                <div style={navButtons}>
                    <button style={btn} onClick={() => changeWeek(-1)}>
                        ← Semaine précédente
                    </button>

                    <button style={btn} onClick={() => changeWeek(1)}>
                        Semaine suivante →
                    </button>
                </div>

                <div style={grid}>
                    <div></div>

                    {Array.from({ length: 6 }, (_, i) => {
                        const day = new Date(currentMonday);
                        day.setDate(currentMonday.getDate() + i);

                        return (
                            <div key={i} style={header}>
                                {day.toLocaleDateString("fr-FR", {
                                    weekday: "short",
                                    day: "numeric",
                                    month: "numeric",
                                })}
                            </div>
                        );
                    })}

                    {hours.map((h, rowIndex) => (
                        <div key={rowIndex} style={{ display: "contents" }}>
                            <div style={hourCell}>{h}</div>

                            {Array.from({ length: 6 }, (_, i) => {
                                const day = new Date(currentMonday);
                                day.setDate(currentMonday.getDate() + i);

                                const dateStr = formatDate(day);

                                const isBooked = rdvs[dateStr]?.includes(h);

                                return (
                                    <div
                                        key={i}
                                        style={{
                                            ...slot,
                                            background: isBooked ? "#ffcccc" : "#fff",
                                            cursor: isBooked ? "not-allowed" : "pointer",
                                        }}
                                        onClick={() => {
                                            if (!isBooked) {
                                                selectSlot(dateStr, h);
                                            }
                                        }}
                                    >
                                        {isBooked ? "Réservé" : ""}
                                    </div>
                                );
                            })}
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
    color: "black",
    fontSize: "20px",
};

const logo = {
    width: "40px",
};

const container = {
    maxWidth: "1200px",
    margin: "20px auto",
};

const title = {
    textAlign: "center",
    marginBottom: "20px",
};

const navButtons = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
};

const btn = {
    padding: "8px 15px",
    background: "#ff0000",
    border: "none",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
};

const grid = {
    display: "grid",
    gridTemplateColumns: "120px repeat(6, 1fr)",
    gap: "1px",
    background: "#ccc",
};

const header = {
    background: "#ff0000",
    color: "white",
    padding: "10px",
    textAlign: "center",
};

const hourCell = {
    background: "white",
    padding: "10px",
    textAlign: "center",
};

const slot = {
    background: "white",
    minHeight: "50px",
};