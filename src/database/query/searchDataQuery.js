const { connection } = require("../config");

const searchDataQuery = async (query) => {
  const result = await connection.query(
    `SELECT 
      beneficiaries.*, 
      organizations.org_name 
    FROM 
      beneficiaries 
    LEFT JOIN 
      organizations 
    ON 
      beneficiaries.org_id = organizations.org_id 
    WHERE 
      beneficiaries.passport ILIKE $1 OR 
      beneficiaries.phone_number ILIKE $1 OR 
      CONCAT(beneficiaries.first_name, ' ', beneficiaries.second_name, ' ', beneficiaries.third_name, ' ', beneficiaries.last_name) ILIKE $1;
    `,
    [`%${query}%`]
  );
  return result.rows;
};

module.exports = searchDataQuery;
