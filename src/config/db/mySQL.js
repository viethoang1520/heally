const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config();

// Initialize connection to the database 
const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function connect() {
  try {
    await sequelize.authenticate();
    console.log("MySQL connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = { sequelize, connect };
