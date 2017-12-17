import { log, debug } from '../';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const auth = {};

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
  token.accessToken = jwt.sign(
    {
      userId,
      expiration,
    },
    process.env.JWT_SECRET,
  );
  return token;
};

auth.validateJWT = (req, res, next) => {
  try {
    const token = req.headers.token;
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    res.set('token', token);
    console.log('in validate')
    console.log('token', req.headers.token)
    console.log('user id', req.headers.id)
    next();
  } catch (e) { 
    log('Invalid Token');
    // res.status(204).send('Invalid Token, redirect to login');
    // res.redirect('localhost:3000/login');
    next(e);
  }
};

export default auth;
