const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../../utils/auth");
const { connection } = require("../../database/config");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Fetch the user from the database
    const result = await connection.query(
      "SELECT id, org_id, password_hash FROM auth WHERE email = $1",
      [email]
    );
    if (result.rows.length === 0) {
      return res.status(400).send("Invalid email or password.");
    }

    const { org_id, password_hash } = result.rows[0];

    // Verify password
    const isMatch = await comparePassword(password, password_hash);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password.");
    }

    // Generate JWT token
    const token = generateToken(org_id);

    // Set the token and org_id in cookies
    res.cookie("token", token, { httpOnly: true, secure: true }); // `httpOnly` for security, `secure` in production
    res.cookie("org_id", org_id, { httpOnly: true, secure: true });

    // Return a success message and org_id for reference
    res.status(200).json({ message: "Login successful", org_id });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Error during login.");
  }
};

module.exports = login;
