import data from './../';

const TYPE = 'job';

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
    }
  },
  post: (req, res) => {
    console.log('inside internal/controller/job', req.body)
    data.model[TYPE].post(req.body, (err, result) => {
      if (err) {
        console.log('inside internal/controller/job', err);
      }
      res.status(200).send('post data into job table');
    });
  },
};
