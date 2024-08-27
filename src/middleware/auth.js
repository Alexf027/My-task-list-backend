const jwt = require("jsonwebtoken");

function authJWT(payload) {
   return new Promise((resolve, reject) => {
      jwt.sign(
         payload,
         process.env.SECRET_KEY,
         {
            expiresIn: '1h',
         },
         (err, token) => {
            if(err) reject(err)
            resolve(token)
         }
      );
    });
};

module.exports = authJWT;