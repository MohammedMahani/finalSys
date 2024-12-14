const { connection } = require("../config");
const uploadDataQuery = async (beneficiaryData) => {
  const {
    org_id,
    first_name,
    second_name,
    third_name,
    last_name,
    age,
    passport,
    gender,
    address,
    phone_number,
    rent,
    furniture,
    clothes,
    medical,
    pocket_money,
    other,
  } = beneficiaryData;

  const t = await connection.query(
    `INSERT INTO beneficiaries (org_id, first_name, second_name, third_name, last_name, age, passport, gender, address, phone_number,
     rent, furniture, clothes, medical, pocket_money, other)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);`,
    [
      org_id,
      first_name,
      second_name,
      third_name,
      last_name,
      age,
      passport,
      gender,
      address,
      phone_number,
      rent,
      furniture,
      clothes,
      medical,
      pocket_money,
      other,
    ]
  );
  return t;
};

module.exports = uploadDataQuery;
