const express = require("express");
const router = express.Router();
const db = require("../../db");
let success = false;

//Route 1 : Create a new admin
router.post("/createadmin", async (req, res) => {
  try {
    const results = await db.query("INSERT INTO admin(name, username, password) VALUES($1, $2, $3) returning *", [req.body.name, req.body.username, req.body.password]);
    res.json({ data: results.rows });
    console.log(results.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ success, error: "Internal Server Errors", message: error.message });
  }
});

//Route 2 : Authentic a admin using login
router.get("/login", (req, res) => {
  res.json({ name: "Login hai bhai ye" });
});

module.exports = router;
