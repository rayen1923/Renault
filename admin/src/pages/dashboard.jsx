import Layout from "./Layout";

export default function Dashboard() {
  return (
    <Layout>
      <h1 style={{ fontSize: "34px", fontWeight: "800", color: "#111" }}>
        Welcome 👋
      </h1>

      <p style={{ fontSize: "16px", color: "#666", marginTop: "10px" }}>
        Manage agencies and services from your dashboard
      </p>
    </Layout>
  );
}