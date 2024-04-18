import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });  // 401 for Unauthorized access
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' });  // 403 for Forbidden access
            req.user = decoded.UserInfo.username;  // Assuming the decoded token contains UserInfo object with username
            req.roles = decoded.UserInfo.roles;    // and roles properties
            next();
        }
    );
};

export default verifyJWT;  // Use default export for the middleware function
