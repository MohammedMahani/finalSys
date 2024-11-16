const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;
const JWT_SECRET = "0123456"; // Replace with an environment variable in production

// Hash password
const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

// Compare password with hash
const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

// Generate JWT token
const generateToken = (orgId) => {
    return jwt.sign({ orgId }, JWT_SECRET, { expiresIn: "1h" });
};

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
};
