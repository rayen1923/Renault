import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function ContactPage() {
    const navigate = useNavigate();

    const vehicle = JSON.parse(
        sessionStorage.getItem("vehicle")
    );

    const [phones, setPhones] = useState([]);
    const [selectedPhone, setSelectedPhone] =
        useState("");

    const [showAddModal, setShowAddModal] =
        useState(false);

    const [showOtpModal, setShowOtpModal] =
        useState(false);

    const [newPhone, setNewPhone] =
        useState("");

    const [otpCode, setOtpCode] =
        useState("");

    useEffect(() => {
        loadPhones();
    }, []);

    const loadPhones = async () => {
        try {
            const res = await api.get(
                `/phonenumbers/${vehicle.id}`
            );

            setPhones(res.data);

            if (res.data.length > 0) {
                setSelectedPhone(res.data[0].id); // FIXED
            }
        } catch (err) {
            console.error(err);
        }
    };

    const confirmPhone = () => {
        const phoneObj = phones.find(
            (p) => p.id == selectedPhone
        );

        sessionStorage.setItem(
            "phone",
            JSON.stringify(phoneObj) // FIXED: full object
        );

        navigate("/service");
    };

    const sendOtp = async () => {
        try {
            const res = await api.post(
                `/otp/send/${newPhone}`
            );

            // show OTP in alert for testing
            alert(
                "Your OTP code is: " + res.data.code
            );

            setShowAddModal(false);
            setShowOtpModal(true);
        } catch (err) {
            console.error(err);
        }
    };

    const verifyOtp = async () => {
        try {
            const res = await api.post(
                `/otp/verify?phone=${newPhone}&code=${otpCode}`
            );

            if (res.data.success) {

                const saved = await api.post("/phonenumbers", {
                    id: 0,
                    vehicleId: vehicle.id,
                    phoneNumberValue: newPhone,
                    isVerified: true,
                    createdAt: new Date().toISOString()
                });

                // FIXED: store REAL DB object with ID
                sessionStorage.setItem(
                    "phone",
                    JSON.stringify(saved.data)
                );

                alert("Phone verified successfully");

                setShowOtpModal(false);
                navigate("/service");
            } else {
                alert("Invalid OTP");
            }
        } catch (err) {
            console.error(err);
        }
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
                <div style={formBox}>
                    <h2 style={title}>
                        Contact
                    </h2>

                    <p style={label}>
                        Select phone number
                    </p>

                    <select
                        style={select}
                        value={selectedPhone}
                        onChange={(e) =>
                            setSelectedPhone(
                                e.target.value
                            )
                        }
                    >
                        {phones.map((p) => (
                            <option
                                key={p.id}
                                value={
                                    p.phoneNumberValue
                                }
                            >
                                {
                                    p.phoneNumberValue
                                }
                            </option>
                        ))}
                    </select>

                    <button
                        style={btn}
                        onClick={confirmPhone}
                    >
                        Confirm
                    </button>

                    <button
                        style={{
                            ...btn,
                            marginTop: "10px",
                            background:
                                "#2f2f2f",
                        }}
                        onClick={() =>
                            setShowAddModal(
                                true
                            )
                        }
                    >
                        Add New Number
                    </button>
                </div>
            </div>

            {/* ADD PHONE MODAL */}
            {showAddModal && (
                <div style={modalOverlay}>
                    <div style={modal}>
                        <h3>
                            Add Phone Number
                        </h3>

                        <input
                            type="text"
                            placeholder="25084006"
                            value={newPhone}
                            onChange={(e) =>
                                setNewPhone(
                                    e.target.value
                                )
                            }
                            style={input}
                        />

                        <button
                            style={btn}
                            onClick={sendOtp}
                        >
                            Send OTP
                        </button>

                        <button
                            style={{
                                ...btn,
                                background:
                                    "gray",
                            }}
                            onClick={() =>
                                setShowAddModal(
                                    false
                                )
                            }
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* OTP MODAL */}
            {showOtpModal && (
                <div style={modalOverlay}>
                    <div style={modal}>
                        <h3>
                            OTP Verification
                        </h3>

                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otpCode}
                            onChange={(e) =>
                                setOtpCode(
                                    e.target.value
                                )
                            }
                            style={input}
                        />

                        <button
                            style={btn}
                            onClick={verifyOtp}
                        >
                            Verify OTP
                        </button>

                        <button
                            style={{
                                ...btn,
                                background:
                                    "gray",
                            }}
                            onClick={() =>
                                setShowOtpModal(
                                    false
                                )
                            }
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

/* ================= STYLES ================= */

const navbar = {
    width: "100%",
    height: "60px",
    background: "#ff0000",
    padding: "0 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const logoText = {
    fontSize: "18px",
    color: "black",
    fontWeight: "700",
};

const logo = {
    width: "32px",
};

const container = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 60px)",
    background: "#f1f2f6",
};

const formBox = {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "320px",
    boxShadow:
        "0 5px 15px rgba(0,0,0,0.08)",
};

const title = {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "28px",
    color: "#222",
};

const label = {
    marginBottom: "8px",
    fontWeight: "600",
    color: "#333",
};

const select = {
    width: "100%",
    height: "42px",
    padding: "0 12px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
};

const input = {
    width: "100%",
    height: "42px",
    padding: "0 12px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
};

const btn = {
    width: "100%",
    height: "42px",
    background: "#ff0000",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    color: "white",
    fontSize: "14px",
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

const modal = {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    width: "320px",
};