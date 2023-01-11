const express = require("express");
const router = express.Router();
const db = require("../../db");
var bcrypt = require("bcryptjs");
let success = false;
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "smssignature";
const fetchuser = require("../../middleware/fetchuser");

//Route 1 : Create a new admin
router.post(
  "/createadmin",
  //express validators are used to validate the credentials
  [
    body("name", "Enter the valid name !").isLength({ min: 3 }),
    body("username", "Enter the valid username !").isLength({ min: 3 }),
    body("email", "Enter the valid email !").isEmail(),
    body("password", "Enter the valid password !").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //hashing algorithm
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);

      const results = await db.query("INSERT INTO admin(name, username, password, email) VALUES($1, $2, $3, $4) returning *", [req.body.name, req.body.username, securePassword, req.body.email]);
      console.log(results.rows);

      //payload for sign method of jwt token
      const data = {
        user: { id: results.rows[0].id },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authtoken: authToken });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success, error: "Internal Server Errors", message: error.message });
    }
  }
);

//Route 2 : Authentic a admin using login
router.post("/login", [body("username", "Enter the valid username !").isLength({ min: 3 }), body("password", "Enter the valid password !").isLength({ min: 5 })], async (req, res) => {
  try {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //hashing algorithm
    const user = await db.query("SELECT * FROM admin where username = $1", [req.body.username]);
    if (!user) {
      return res.status(400).json({ success, err: "Please try to login with the correct credentials username" });
    }

    const passwordCompare = await bcrypt.compare(req.body.password, user.rows[0].password);
    if (!passwordCompare) {
      return res.status(400).json({ success, err: "Please try to login with the correct credentials password" });
    }

    //payload for sign method of jwt token
    const data = {
      user: { id: user.rows[0].id },
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ success: true, authtoken: authToken });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success, error: "Internal Server Errors", message: error.message });
  }
});

//Route:3 Get LoggedIn user details using : /api/auth/getuser, Login required
router.get("/getadmin", fetchuser, async (req, res) => {
  try {
    userID = req.user.id;
    const results = await db.query("SELECT * FROM admin where id = $1", [userID]);
    res.status(200).send({ data: results.rows[0] });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success, err: "Internal server error" });
  }
});

module.exports = router;
