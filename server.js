const express = require("express");
const cors = require("cors"); // 1. Import the cors package
require("dotenv").config();

// --- 1. Load Database Connector ---
const { connectDB, sequelize } = require("./src/config/database");

<<<<<<< HEAD
// --- 2. Load Models ---
require("./src/models/RiskCheck");
=======
// --- 2. Load Models (MUST be loaded before sequelize.sync()) ---
// These files define models using the SAME sequelize instance
require("./src/models/Riskcheck");
>>>>>>> 9c476b4fe67b2ecd4894780074643c929efbe8bf
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
// This tells the server to allow requests from your specific Vercel frontend URL
const allowedOrigins = [
  "http://localhost:5173", // Allows local testing
  "https://frontcancer-ru1a-m8pu0v6sj-essynjosh353-gmailcoms-projects.vercel.app" // Your live frontend URL
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