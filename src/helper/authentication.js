import { log, debug } from '../';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const auth = {};

auth.validateJWT = (req, res, next) => {
  try {
    const { token } = req.headers;
    const secret = process.env.JWT_SECRET;
    jwt.verify(token, secret);
    debug('VALIDATED');
    next();
  } catch (e) { 
    debug('Invalid Token');
    res.status(401).send('Invalid Token, redirect to login');
    next(e);
  }
};
auth.encryptPw = (password, callback) => {
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      callback(err, hash);
    });
    if (err) {
      callback(err);
    }
  });
};

auth.encrypt = (data, callback) => {
  const saltRounds = 1;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(data, salt, (err, hash) => {
      callback(err, hash);
    });
  });
};

auth.isValidPw = (loginPw, dbPwHash, callback) => {
  bcrypt.compare(loginPw, dbPwHash, (err, res) => {
    callback(err, res);
  });
};

auth.generateJWT = ({ userId }) => {
  const milliscondsToHours = 3.6e+6;
  const sessionHours = 1;
  const token = {};
  const expiration = Date.now() + (milliscondsToHours.toFixed() * sessionHours);
  token.accessToken = jwt.sign({
    userId,
    expiration,
  }, process.env.JWT_SECRET);
  return token.accessToken;
};

export default auth;
