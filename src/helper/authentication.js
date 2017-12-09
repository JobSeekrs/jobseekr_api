import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default {
  encryptPw : (password, callback) => {
    const saltRounds = 10
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
          callback(err, hash)
      });
    });
  },
  isValidPw: (loginPw, dbPwHash, callback) => {
    bcrypt.compare(loginPw, dbPwHash, (err, res) => {
      callback(err, res);
  });
  },

  generateJWT: ({ id: id, emailLogin: emailLogin }) => {
    const milliscondsToHours = 3.6e+6;
    const sessionHours = 1;
    const token = {};

    token.accessToken = jwt.sign(
      {
        id: id,
        emailLogin: emailLogin,
        exp: Date.now() + milliscondsToHours.toFixed() * sessionHours
      }, 
      process.env.JWT_SECRET
    );
    return token;
  },

  validateJWT: (req, res, next) => {
    // try {
    //   jwt.verify(req.headers.authorization.slice(7), process.env.JWT_SECRET);
    //   console.log('User verified');
    //   next();
    // } catch (e) {
    //   console.err('Token validation failed ', req.headers)
    //   next(e);
    // }
    next();
  },


};

