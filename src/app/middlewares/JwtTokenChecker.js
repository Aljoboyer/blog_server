const jwt = require("jsonwebtoken");

const JwtTokenChecker = (req, res, next) => {
 
    let authHeader = req.headers?.authorization;
    const token = authHeader.split(' ')[1];

    if (!authHeader) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Unauthorized !!', err });
      }
  
      req.user = user;
      next();
    });

  };

  module.exports = JwtTokenChecker;