const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Tracker",
  password: "Test.@26",
  port: 5432,
});

module.exports = pool;