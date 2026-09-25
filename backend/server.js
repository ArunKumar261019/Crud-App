const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || "database",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "appdb",
  user: process.env.DB_USER || "appuser",
  password: process.env.DB_PASSWORD || "apppassword"
});

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.get("/api/items", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, description FROM items ORDER BY id"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
