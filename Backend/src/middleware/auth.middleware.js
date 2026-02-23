const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "No token , Unauthorized"
        })
    }
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);

    } catch (error) {
        return res.status(401).json({
            message: "user not authorized"
        })
    }

    req.user = decoded;
    next();
}

module.exports = authMiddleware;