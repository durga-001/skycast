const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "weather_app",
  password: process.env.password,
  port: 5432,
});

module.exports = pool;
