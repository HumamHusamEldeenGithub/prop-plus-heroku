function verifyToken(req, res, next) {
    console.log("ENTER");
    var token = req.headers['authorization'];
    console.log(req.headers);
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    if (token == process.env.AUTHORIZATION)
        next();
    else {
        console.log("ENTER");
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
}

module.exports = verifyToken;