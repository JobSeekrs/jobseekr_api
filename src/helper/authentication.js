import { log, debug } from '../';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const auth = {};

auth.encryptPw = (password, callback) => {
  const saltRounds = 10
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      callback(err, hash)
    });
  });
};

auth.encrypt = (data, callback) => {
  const saltRounds = 10
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      callback(err, hash)
    });
  });
};

auth.isValidPw = (loginPw, dbPwHash, callback) => {
  bcrypt.compare(loginPw, dbPwHash, (err, res) => {
    callback(err, res);
  });
};

auth.generateJWT = ({ userId, emailLogin }) => {
  const milliscondsToHours = 3.6e+6;
  const sessionHours = 1;
  const token = {};
  const expiration = Date.now() + milliscondsToHours.toFixed() * sessionHours;
  token.accessToken = jwt.sign(
    {
      userId: userId,
      expiration: expiration
    }, 
    process.env.JWT_SECRET
  );
  return token;
};

auth.validateJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token.slice(7), secret);
    res.set('Authorization', token);
    next();
  } catch (e) {
    console.log('Invalid Token')
    res.status(204).send('Invalid Token, redirect to login');
    next(e);
  }
};

export default auth;