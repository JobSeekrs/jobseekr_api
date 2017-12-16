import db from './../../';

const TYPE = 'jobDetailsNotes';

export default  {
  put: (req, res) => {
    db.model[TYPE].put(req.body, (err, data) => {
      res.status(200).send(JSON.stringify(data));
    });
  },
};
