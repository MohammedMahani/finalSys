const { connection } = require("../config");

const editDataQuery = async (beneficiaryData) => {
  const {
    name,
    last_name,
    age,
    passport,
    gender,
    address,
    phone_number,
    status,
    id,
    org_id,
  } = beneficiaryData;

  const result = await connection.query(
    `UPDATE beneficiaries 
         SET name = $1, last_name = $2, age = $3, passport = $4, gender = $5, 
             address = $6, phone_number = $7, status = $8 
         WHERE bid = $9 AND org_id = $10 
         RETURNING *`,
    [
      name,
      last_name,
      age,
      passport,
      gender,
      address,
      phone_number,
      status,
      id,
      org_id,
    ]
  );

  return result.rows;
};

module.exports = editDataQuery;
