import db from './../';

const TYPE = 'jobDetail';

export default  {
  get: (req, res) => {
    db.model[TYPE].get((err, data) => {
      res.status(200).send(JSON.stringify(data));
    });
  },
};
