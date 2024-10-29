const jwt = require('jsonwebtoken');

const AuthenticateToken = (req, res, next) => {
    try {
        const jwtToken = req.headers['authorization']?.split(' ')[1];
        console.log(jwtToken);

        if (!jwtToken) {
        return res.status(401).send('Token Not Found');
        }

        jwt.verify(jwtToken, 'jwt_token', (error, payload) => {
        if (error) {
            return res.status(403).send('Invalid Access Token');
        } else {
            req.user = payload; 
            next();
        }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Invalid Access Token");
    }
};

module.exports = AuthenticateToken;
