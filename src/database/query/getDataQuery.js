const { connection } = require("../config");

const getDataQuery = () => {
  const sql = {
    text: "SELECT * FROM beneficiaries",
  };
  return connection.query(sql);
};

module.exports = getDataQuery;
