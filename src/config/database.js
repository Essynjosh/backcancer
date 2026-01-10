const { Sequelize } = require("sequelize");
require("dotenv").config();

/*
  Neon uses PostgreSQL
  The connection string comes from:
  process.env.DATABASE_URL
*/

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

/*
  Connect to Neon and sync models
*/
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Neon PostgreSQL connection established");

    await sequelize.sync();
    console.log("✅ Database synchronized");
  } catch (error) {
    console.error("❌ Unable to connect to Neon DB:", error);
    throw error;
  }
};

/*
  Export Sequelize instance and connect function
*/
module.exports = {
  sequelize,
  connectDB,
};
