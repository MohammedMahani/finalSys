const { editDataQuery } = require("../database/query");

const editData = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    last_name,
    age,
    passport,
    gender,
    address,
    phone_number,
    status,
  } = req.body;
  const org_id = req.orgId;

  try {
    const updatedBeneficiaries = await editDataQuery({
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
    });

    if (updatedBeneficiaries.length === 0) {
      return res
        .status(403)
        .send("You do not have permission to edit this beneficiary.");
    }

    res.status(200).json({
      message: "Beneficiary updated successfully",
      beneficiary: updatedBeneficiaries[0],
    });
  } catch (error) {
    res.status(500).send("Error updating beneficiary.");
  }
};

module.exports = editData;
