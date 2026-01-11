const express = require("express");
const cors = require("cors");
require("dotenv").config();

// --- 1. Load Database Connector ---
const { connectDB, sequelize } = require("./src/config/database");

// --- 2. Load Models (MUST be loaded before sequelize.sync()) ---
require("./src/models/Riskcheck");
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

// --- 5. Apply CORS Middleware ---
const allowedOrigins = [
  "http://localhost:5173",
  "https://frontcancer-ru1a-m8pu0v6sj-essynjosh353-gmailcoms-projects.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

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

// --- Start Server ---
const startServer = async () => {
  console.log("🔌 Connecting to Neon database...");

  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Fatal error starting server:", error);
    process.exit(1);
  }
};

startServer();
