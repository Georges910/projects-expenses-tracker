const express = require("express");
const router = express.Router();
const db = require("../db");

// Add expense
router.post("/", async (req, res) => {
  const { project_id, description, category, amount } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO expenses (project_id, description, category, amount)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [project_id, description, category, amount]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update expense
router.put("/:id", async (req, res) => {
  const { description, category, amount } = req.body;

  try {
    const result = await db.query(
      `UPDATE expenses
       SET description=$1, category=$2, amount=$3
       WHERE id=$4 RETURNING *`,
      [description, category, amount, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete expense
router.delete("/:id", async (req, res) => {
  try {
    await db.query(`DELETE FROM expenses WHERE id=$1`, [req.params.id]);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
