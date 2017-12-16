import db from './../../';

const TYPE = 'jobDetailsEvents';

export default  {
  post: (req, res) => {
    db.model[TYPE].post(req.body, (err, data) => {
      res.status(200).send(JSON.stringify(data));
    });
  },
};
