const express = require("express");
require("dotenv").config();

// --- 1. Load Database Connector ---
const { connectDB, sequelize } = require("./src/config/database");

// --- 2. Load Models (MUST be loaded before sequelize.sync()) ---
// These files define models using the SAME sequelize instance
require("./src/models/RiskCheck");
require("./src/models/Clinic");
require("./src/models/User");

// --- 3. Load Routes ---
const riskRoutes = require("./src/routes/risk");
const clinicRoutes = require("./src/routes/clinic");
const authRoutes = require("./src/routes/auth");
const adminClinicRoutes = require("./src/routes/adminClinic");

// --- 4. Initialize Express App ---
const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(express.json());

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/risk-check", riskRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/api/admin/clinics", adminClinicRoutes);

// --- Health Check ---
app.get("/", (req, res) => {
  res.json({
    message: "Smart Health API is running",
    database: sequelize ? "Connected" : "Not Ready",
  });
});

// --- 5. Start Server ---
const startServer = async () => {
  console.log("🔌 Connecting to Neon database...");

  try {
    await connectDB(); // Connects to Neon + syncs models

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Fatal error starting server:", error);
    process.exit(1);
  }
};

startServer();
