const { Pool } = require('pg');

// Database configuration
const pool = new Pool({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  port: process.env.RDS_PORT,
  ssl: {
    rejectUnauthorized: false // Only if your RDS requires SSL
  }
});

module.exports = pool;