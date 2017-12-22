import { log, debug } from '../../';
import db from '../';
import auth from '../../helper/authentication';

const TYPE = 'user';

export default {
  get: (req, res) => {
    if (Object.keys(req.query).length === 0) {
      db.model[TYPE].getAll(req.headers.userid, (err, data) => {
        res.status(200).send(data);
      });
    } else if (req.query.id && Object.keys(req.query).length === 1) {
      db.model[TYPE].get(req.query.id, (err, data) => {
        res.status(200).send(data);
      });
    } else {
      db.model[TYPE].query(req.query, (err, data) => {
        res.status(200).send(data);
      });
    }
  },
  login: (req, res) => {
    try {
      debug('in login')
      const b64 = req.headers.authorization.slice(6);
      const creds = Buffer.from(b64, 'base64').toString().split(':');
      const emailLogin = creds[0];
      const password = creds[1];
      db.model.user.query({ emailLogin }, (err, rows) => {
        if (!rows.length) {
          res.status(401).send('Invalid Login Email');
        } else {
          auth.isValidPw(password, rows[0].password, (err, isValid) => {
            if (isValid) {
              const userId = rows[0].id;
              const token = auth.generateJWT({ userId, emailLogin });
              debug('Valid Login');
              res.status(200).send({
                token: `${token}`,
                userid: userId,
              });
            } else {
              debug('Invalid Login');
              res.status(401).send('Invalid Login Password');
            }
          });
        }
      });
    } catch (e) {
      debug('Invalid Login');
      res.status(401).send('Invalid Login Password');
    }
  },
  signup: (req, res) => {
    console.log(JSON.stringify(req.body))
    db.model.user.query({ emailLogin: req.body.emailLogin }, (err, rows) => {
      if (rows.length) {
        res.status(401).send('Email Login already exists');
      } else {
        auth.encryptPw(req.body.password, (err, pwHash) => {
          const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailLogin: req.body.emailLogin,
            password: pwHash,
          };
          db.model.user.addOne(user, (err, rows) => {
            if (err) {
              res.status(401).send('Failed to add user');
            } else {
              res.status(200).send('User account created');
            }
          });
        });
      }
    });
  },
};
