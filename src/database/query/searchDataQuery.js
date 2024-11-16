const { connection } = require("../config");

const searchDataQuery = async (query) => {
  const result = await connection.query(
    `SELECT * FROM beneficiaries 
         WHERE name ILIKE $1 OR last_name ILIKE $1`,
    [`%${query}%`]
  );
  return result.rows;
};

module.exports = searchDataQuery;
