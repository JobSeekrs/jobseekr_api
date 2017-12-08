import data from './../';

const TYPE = 'user';

export default  {
  get: (req, res) => {
    if (Object.keys(req.query).length === 0) {
      data.model[TYPE].getAll((err, data) => {
        res.status(200).send(JSON.stringify(data));
      });
    } else if (req.query.id && Object.keys(req.query).length === 1) {
      data.model[TYPE].get(req.query.id,(err, data) => {
        res.status(200).send(JSON.stringify(data));
      });
    } else {
      data.model[TYPE].query(req.query, (err, data) => {
        res.status(200).send(JSON.stringify(data));  		
      });  
    };
  },
};




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