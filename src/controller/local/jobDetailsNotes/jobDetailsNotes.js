import db from './../../';

const TYPE = 'jobDetailsNotes';

export default  {
  put: (req, res) => {
    db.model[TYPE].put((err, data) => {
      res.status(200).send(JSON.stringify(data));
    });
  },
};
