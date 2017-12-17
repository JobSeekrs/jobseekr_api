import db from './../../';

const TYPE = 'jobDetailsNotes';

export default  {
  post: (req, res) => {
    db.model[TYPE].post(req.body, (err, data) => {
      res.status(200).send(JSON.stringify(data));
    });
  },
};
