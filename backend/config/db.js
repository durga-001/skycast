const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "weather_app",
  password: "BhavyaDurgaDRDO",
  port: 5432,
});

module.exports = pool;
