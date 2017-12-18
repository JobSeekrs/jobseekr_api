import db from './../';

const TYPE = 'dashboard';

export default {
  get: (req, res) => {
    db.model[TYPE].get(req.headers.userid, (err, data) => {
      res.status(200).send(JSON.stringify(data));
    });
  },
};
