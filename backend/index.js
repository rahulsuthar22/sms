const db = require("./db");
const express = require("express");
const app = express();
require("dotenv").config();
const router = require("./Routes/auth/auth");
app.use(express.json());

//Creating Endpoints

app.get("/", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM admin");
    // console.log(results);
    res.json({ data: results.rows });
  } catch (error) {
    console.log(error);
    res.send({ error: "Internal Server Error", message: error.message });
  }
});

app.use("/api/auth", router);

//Listening the server
app.listen(process.env.PORT, () => {
  //   console.log(process.env.PORT);
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
