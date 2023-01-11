const jwt = require("jsonwebtoken");
const JWT_SECRET = "smssignature";

const fetchuser = (req, res, next) => {
  //Get the user from the token and add to req object
  const token = req.header("auth-token");
  //   console.log(token);
  if (!token) {
    res.status(401).send({ err: "False token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    console.log(data.user);
    next();
  } catch (error) {
    res.status(401).send({ err: "Please authenticate through the valid token" });
  }
};
module.exports = fetchuser;
