const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_secret_key"; // Use the same secret key as in `utils/auth.js`

const authenticate = (req, res, next) => {
    const token = req.cookies.token; // Retrieve token from cookies

    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.orgId = decoded.orgId; // Attach orgId to the request
        next();
    } catch (err) {
        res.status(400).send("Invalid token.");
    }
};

module.exports = authenticate;
