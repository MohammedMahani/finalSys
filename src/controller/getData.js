const { getDataQuery } = require("../database/query");

const getData = (req, res) => {
  getDataQuery()
    .then((data) => {
      res.status(200).json(data.rows);
    })
    .catch((err) => res.status(500).send(err));
};

module.exports = getData;
