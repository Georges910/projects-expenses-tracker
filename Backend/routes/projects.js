const express = require("express");
const router = express.Router();
const db = require("../db");

// ================================
// POST /projects
// Create a new project
// ================================
router.post("/", async (req, res) => {
  const { name, client_name, estimated_budget } = req.body; // <-- use client_name

  if (!name || !client_name || !estimated_budget) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const budget = Number(estimated_budget);
  if (isNaN(budget)) {
    return res.status(400).json({ error: "Estimated budget must be a number" });
  }

  try {
    const result = await db.query(
      `INSERT INTO projects (name, client_name, estimated_budget)
       VALUES ($1, $2, $3) RETURNING *`,
      [name, client_name, budget] // <-- also client_name here
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Database Error:", err.message);
    res.status(500).json({ error: "Database error: " + err.message });
  }
});

// ================================
// GET /projects
// Fetch all projects with budget summary
// ================================
router.get("/", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT p.*,
        COALESCE(SUM(e.amount), 0) AS total_expenses,
        (p.estimated_budget - COALESCE(SUM(e.amount), 0)) AS remaining_budget
      FROM projects p
      LEFT JOIN expenses e ON p.id = e.project_id
      GROUP BY p.id
      ORDER BY p.id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Database Error:", err.message);
    res.status(500).json({ error: "Database error: " + err.message });
  }
});

// ================================
// GET /projects/:id
// Fetch single project with its expenses
// ================================
router.get("/:id", async (req, res) => {
  try {
    const projectResult = await db.query(
      `SELECT * FROM projects WHERE id=$1`,
      [req.params.id]
    );

    if (projectResult.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    const expensesResult = await db.query(
      `SELECT * FROM expenses WHERE project_id=$1 ORDER BY id DESC`,
      [req.params.id]
    );

    res.json({
      ...projectResult.rows[0],
      expenses: expensesResult.rows,
    });
  } catch (err) {
    console.error("Database Error:", err.message);
    res.status(500).json({ error: "Database error: " + err.message });
  }
});

module.exports = router;

