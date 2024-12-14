const fs = require("fs");
const csv = require("csv-parser");
const { uploadDataQuery } = require("../database/query");
const path = require("path");

const uploadData = (req, res) => {
  const orgId = 1; // Retrieve org_id from request body

  if (!orgId) {
    return res.status(400).send("org_id is required.");
  }

  const uploadsDir = path.join(__dirname, "../uploads");
  const tempFilePath = path.join(uploadsDir, "temp.csv");

  // Ensure the uploads directory exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true }); // Create the directory if it doesn't exist
  }

  // Write binary data to the temporary file
  const fileStream = fs.createWriteStream(tempFilePath);
  req.pipe(fileStream);

  fileStream.on("finish", () => {
    const results = [];

    // Parse the CSV file
    fs.createReadStream(tempFilePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          for (const row of results) {
            const beneficiaryData = {
              org_id: orgId, // Use org_id from the request
              first_name: row.first_name,
              second_name: row.second_name,
              third_name: row.third_name,
              last_name: row.last_name,
              age: row.age,
              passport: row.passport,
              gender: row.gender,
              address: row.address,
              phone_number: row.phone_number,
              rent: row.rent,
              furniture: row.furniture,
              clothes: row.clothes,
              medical: row.medical,
              pocket_money: row.pocket_money,
              other: row.other,
            };

            try {
              await uploadDataQuery(beneficiaryData);
            } catch (error) {
              console.error("Error inserting beneficiary:", error);
            }
          }

          // Delete the temporary file
          fs.unlinkSync(tempFilePath);

          res.send(
            "Beneficiary data uploaded and inserted into the database successfully."
          );
        } catch (err) {
          console.error("Error processing data:", err);
          res.status(500).send("Error inserting data into the database.");
        }
      })
      .on("error", (err) => {
        console.error("Error reading CSV:", err);
        res.status(500).send("Error processing the CSV file.");
      });
  });

  fileStream.on("error", (err) => {
    console.error("Error writing temporary file:", err);
    res.status(500).send("Error uploading file.");
  });
};

module.exports = uploadData;
