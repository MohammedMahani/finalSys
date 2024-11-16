const { connection } = require("../config");
const uploadDataQuery = async (beneficiaryData) => {
  const {
    org_id,
    name,
    last_name,
    age,
    passport,
    gender,
    address,
    phone_number,
    status,
  } = beneficiaryData;

  const t = await connection.query(
    `INSERT INTO beneficiaries (org_id, name, last_name, age, passport, gender, address, phone_number, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (passport) 
      DO UPDATE SET 
          age = EXCLUDED.age, 
          name = EXCLUDED.name,
          last_name = EXCLUDED.last_name,
          gender = EXCLUDED.gender, 
          address = EXCLUDED.address, 
          phone_number = EXCLUDED.phone_number, 
          status = EXCLUDED.status;`,
    [
      org_id,
      name,
      last_name,
      age,
      passport,
      gender,
      address,
      phone_number,
      status,
    ]
  );
  return t;
};

module.exports = uploadDataQuery;
