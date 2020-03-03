const secrets = require('../config/secrets');
const jwt = require('jsonwebtoken');

module.exports = (req, res,next) => {
    const token = req.headers.authorization;
    console.log(token)
    if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedJwt) => {
            if (err) {
                res.status(401).json({message: 'Unauthorized'})
            } else {
                req.user = decodedJwt;
                
                next();
            }
        })
    } else {
        res.status(400).json({message: 'Unauthorized'})
    }
}