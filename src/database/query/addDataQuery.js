const { connection } = require("../config");

const addDataQuery = async (beneficiaryData) => {
  const {
    name,
    last_name,
    age,
    passport,
    gender,
    address,
    phone_number,
    status,
    org_id,
  } = beneficiaryData;

  const result = await connection.query(
    `INSERT INTO beneficiaries (name, last_name, age, passport, gender, address, phone_number, status, org_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [
      name,
      last_name,
      age,
      passport,
      gender,
      address,
      phone_number,
      status,
      org_id,
    ]
  );
  return result.rows[0];
};

module.exports = addDataQuery;
