//pg module to connect node and postgers
const { Pool } = require("pg");

//Give all the variables with the predefined name of the variables to connect postgres in .env file and the new pool automatically detect the variables
const pool = new Pool();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
