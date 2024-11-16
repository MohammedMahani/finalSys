const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../../utils/auth");
const { connection } = require("../../database/config");

const signup = async (req, res) => {
  const { username, email, password, org_id } = req.body;

  try {
    // Check if the email already exists
    const emailExists = await connection.query(
      "SELECT id FROM auth WHERE email = $1",
      [email]
    );
    if (emailExists.rows.length > 0) {
      return res.status(400).send("Email already registered.");
    }

    // Hash the password and insert into auth table
    const passwordHash = await hashPassword(password);
    await connection.query(
      "INSERT INTO auth (org_id, username, email, password_hash) VALUES ($1, $2, $3, $4)",
      [org_id, username, email, passwordHash]
    );

    res.status(201).send("Organization registered successfully.");
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("Error during signup.");
  }
};

module.exports = signup;
