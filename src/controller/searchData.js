const { searchDataQuery } = require("../database/query");

const searchData = async (req, res, next) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).send("Search query is required.");
  }

  try {
    const beneficiaries = await searchDataQuery(query);

    if (beneficiaries.length > 0) {
      res.status(200).json(beneficiaries);
    } else {
      res.status(404).send("No beneficiaries found.");
    }
  } catch (error) {
    res.status(500).send("Error while searching beneficiaries.");
  }
};

module.exports = searchData;
