import db from './../';

const TYPE = 'dashboard';

export default {
  get: (req, res) => {
    console.log('in db dashboard')
    console.log('headers', req.headers)
    db.model[TYPE].get(req.headers.userid, (err, data) => {
      res.status(200).send(JSON.stringify(data));
    });
  },
};
