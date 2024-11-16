const addData = async (req, res) => {
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
    const beneficiary = await addBeneficiaryQuery({
      name,
      last_name,
      age,
      passport,
      gender,
      address,
      phone_number,
      status,
      org_id,
    });

    res.status(201).json({
      message: "Beneficiary added successfully",
      beneficiary,
    });
  } catch (error) {
    res.status(500).send("Error adding beneficiary.");
  }
};

module.exports = addData;
