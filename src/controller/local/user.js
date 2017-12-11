import db from './../';
import helper from './../../helper/';

const TYPE = 'user';

export default  {
  get: (req, res) => {
    if (Object.keys(req.query).length === 0) {
      db.model[TYPE].getAll((err, data) => {
        res.status(200).send(JSON.stringify(data));
      });
    } else if (req.query.id && Object.keys(req.query).length === 1) {
      db.model[TYPE].get(req.query.id,(err, data) => {
        res.status(200).send(JSON.stringify(data));
      });
    } else {
      db.model[TYPE].query(req.query, (err, data) => {
        res.status(200).send(JSON.stringify(data));	
      });  
    };
  },
  login: (req, res) => {
    const emailLogin = req.body.emailLogin;
    const password = req.body.password;

    db.model.user.query({emailLogin},(err, rows) => {
      if (!rows.length)	{
        res.status(401).send('Invalid Login Email');
      } else {
        helper.auth.isValidPw(password, rows[0].password, (err, isValid) => {
          if (isValid) {
            res.status(200).send('Valid Login');
          } else {
            res.status(401).send('Invalid Login Password');
          }
        });
      }
    });  
  },
  signup: (req, res) => {
    const emailLogin = req.body.emailLogin;
    db.model.user.query({emailLogin},(err, rows) => {
      if (rows.length)	{
        res.status(401).send('Email Login already exists');
      } else {
        helper.auth.encryptPw(req.body.password, (err, pwHash) => {

          const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailLogin: req.body.emailLogin,
            password: pwHash
          };
          db.model.user.addOne(user, (err, rows) => {
            if (err) {
              res.status(401).send('Failed to add user' + JSON.stringify(err));
            } else {
              res.status(200).send('Added user');
            }
          });
        });
      }
    });
  },
};  




  //   try {
  //     data.model.user.get

  //     const user = await User.findOne({ username: req.body.username });
  //     if (user) {
  //       log('User already exists');
  //       return res.status(204).send('User already exists');
  //     }
  //     const password = await hashPassword(req.body.password);
  //     const newUser = new User(Object.assign(req.body, { password }));
  //     await newUser.save();
  //     log('User successfully created');
  
  //     const token = generateToken(req.body);
  //     return res.status(200).send(token);
  //   } catch (error) {
  //     log('Error in createUser ', error);
  //     return res.status(400).send(error);
  //   }
  // },
  // login: (req, res) => {
    // res.body.x = 'this is the response body'
    // res.status(200).send('hello');
  // }
//   },
// };


// export const authUser = async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     const authenticated = await comparePasswords(req.body.password, user.password);
//     if (authenticated) {
//       const token = generateToken(user);
//       log('User authenticated');
//       res.status(200).send(token);
//     } else {
//       log('User is not authenticated');
//       res.status(204).send('User not authenticated');
//     }
//   } catch (error) {
//     log('Error in authUser ', error);
//     res.status(400).send(error);
//   }
// };

// export const createUser = async (req, res) => {

// };

// exports.create = function (req, res){
//   req.body.password = Common.encrypt(req.body.password);
//   User.saveUser(req.body, function(err, user) {
//       if (!err) {
//           var tokenData = {
//               username: user.username,
//               id: user._id
//           }
//           Common.sentMailVerificationLink(user,Jwt.sign(tokenData, privateKey));
//           return res.send(Boom.forbidden("Please confirm your email id by clicking on link in email"));
//       } else {
//           if (11000 === err.code || 11001 === err.code) {
//               return res.send(Boom.forbidden("please provide another user email"));
//           } else{
//             return res.send(Boom.forbidden(err)); // HTTP 403
//           }
//       }
//   })
// }